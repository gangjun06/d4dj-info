// refference: https://github.com/GEEKiDoS/D4DJ-Tools/blob/master/Scripts/Generate.csx
import fs from 'fs'
import path from 'path'
import { modelSetting } from './data.js'
import { ResultType } from './types.js'
const __dirname = path.resolve()

const masterRegex = new RegExp('public class (.*Master) : MasterBase(<.*, .*>)')
const typeRegex = new RegExp('public ([^ ]+) ([^ ]+) { get; set; }')
const enumRegex = new RegExp('public enum (\\w+)')
const enumMemberRegex = new RegExp('public const (.*?) (.*?) = (.*?);')

const result: Map<string, ResultType> = new Map()

let prisma = `
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
}
`

const prismaExtra = `
enum Locale {
  en
  ja
}

`

const extraFields: { [key: string]: string[] } = {}

const upperFirst = (str: string) => str[0].toUpperCase() + str.slice(1)

// const removeS = (str: string) =>
//   str.match(/[^u]s$/) ? str.replace(/s$/, '') : str

const nameConverter = (
  name: string,
  { modelName, type }: { modelName: string; type: string }
): [converted: string | null, extra: string] => {
  const setting = modelSetting[modelName]
  name = name.replace(/__/g, '')
  name = name[0].toLowerCase() + name.slice(1)
  let extra = ''
  if (name === 'id') {
    extra = '@id'
  } else if (name.endsWith('PrimaryKey')) {
    const fieldName = name.slice(0, -10)
    name = fieldName + 'Id'
    if (!setting || !setting.fields) {
      return [name, extra]
    }
    const settingFields = setting.fields.find(
      (d) =>
        (typeof d.key === 'object' && d.key.includes(fieldName)) ||
        d.key === fieldName
    )
    if (!settingFields) {
      return [null, '']
    }

    if (!extraFields[modelName]) {
      extraFields[modelName] = []
    }

    const { type, ref } = settingFields
    let { refField } = settingFields

    refField = refField.replace(/\$/, upperFirst(fieldName))

    if (type === 'ManyToMany') {
      extraFields[modelName].push(
        `${fieldName} ${ref}[] @relation("${modelName}_${upperFirst(
          fieldName
        )}")`
      )
      if (!extraFields[ref]) extraFields[ref] = []
      extraFields[ref].push(
        `${refField} ${modelName}[] @relation("${modelName}_${upperFirst(
          fieldName
        )}")`
      )
    } else if (type === 'OneToMany') {
      extraFields[modelName].push(
        `${fieldName} ${ref} @relation(fields: [${name}], references: [id])`
      )
      if (!extraFields[ref]) extraFields[ref] = []
      extraFields[ref].push(`${refField} ${modelName}[]`)
      return [name, extra]
    } else if (type === 'ManyToOne') {
    } else {
      extraFields[modelName].push(
        `${fieldName} ${ref} @relation(fields: [${name}], references: [id])`
      )
      if (!extraFields[ref]) extraFields[ref] = []
      extraFields[ref].push(`${refField} ${modelName}`)
      return [name, extra]
    }

    return [null, extra]
  }
  return [name, extra]
}

const typeConverter = (type: string): [converted: string, noType: boolean] => {
  switch (type) {
    case 'bool':
      return ['Boolean', true]
    case 'bool[]':
      return ['Boolean[]', true]
    case 'int':
      return ['Int', true]
    case 'int[]':
      return ['Int[]', true]
    case 'float':
    case 'long':
      return ['Float', true]
    case 'float[]':
    case 'long[]':
      return ['Float[]', true]
    case 'string':
      return ['String', true]
    case 'string[]':
      return ['String[]', true]
    case 'DateTime':
      return ['DateTime', true]
    case 'DateTime[]':
      return ['DateTime', true]
    default:
      return [type.replace(/\[\]/, ''), true]
  }
}
export const codeGenerate = () => {
  const file = fs.readFileSync(path.join(__dirname, './data/dump.cs'))
  const fileStr = file.toString().split('\n')

  const enumTarget: string[] = []

  let curData: ResultType | null = null
  let prevLine = ''

  fileStr.forEach((line) => {
    if (curData) {
      const match = line.match(typeRegex)
      if (prevLine.includes('[KeyAttribute]') && match) {
        const [, type, name] = match
        const [typeConverted, noType] = typeConverter(type)
        const [nameConverted, extra] = nameConverter(name, {
          modelName: curData.name,
          type: typeConverted,
        })

        if (noType) enumTarget.push(typeConverted)

        if (nameConverted) {
          curData.fields.push({
            key: nameConverted,
            value: typeConverted,
            extra,
          })
        }
      } else if (line === '}') {
        if (!curData.fields.find((f) => f.key === 'id')) {
          curData.fields.unshift({
            key: 'id',
            value: 'Int',
            extra: '@id @default(autoincrement())',
          })
        }
        curData.fields.push({
          key: 'locale',
          value: 'Locale',
        })
        result.set(curData.name, curData!)
        curData = null
      }
      prevLine = line
      return
    }

    const match = line.match(masterRegex)
    if (match) {
      curData = { name: match[1], type: 'Master', fields: [], extra: [] }
    }
  })

  fileStr.forEach((line) => {
    if (curData) {
      const match = line.match(enumMemberRegex)
      if (match) {
        const [, , name, value] = match
        curData.fields.push({ key: name, value })
      } else if (line === '}') {
        result.set(curData.name, curData!)
        curData = null
      }
      return
    }

    const match = line.match(enumRegex)
    if (match && prevLine !== '// Namespace: UnityEngine') {
      if (enumTarget.includes(match[1])) {
        curData = { name: match[1], type: 'Enum', fields: [], extra: [] }
      }
    }
    prevLine = line
  })

  const arrayData: ResultType[] = Array.from(result.values()).sort((a, b) =>
    a > b ? 1 : 0
  )

  result.forEach((item) => {
    arrayData.push(item)
    if (item.type === 'Master') {
      prisma += `model ${item.name} {\n`
      item.fields.forEach((field) => {
        prisma += `  ${field.key} ${field.value}${
          field.extra ? ` ${field.extra}` : ''
        }\n`
      })
      item.extra.map((extra) => {
        prisma += `  ${extra}\n`
      })
      if (extraFields[item.name]) {
        extraFields[item.name].forEach((field) => {
          prisma += `  ${field}\n`
        })
      }
      prisma += '}\n\n'
    } else if (item.type === 'Enum') {
      prisma += `enum ${item.name} {\n`
      item.fields.forEach((field) => {
        prisma += `  ${field.key}\n`
      })
      prisma += '}\n\n'
    }
  })
  prisma += prismaExtra

  fs.writeFileSync(path.join(__dirname, './data/schema.prisma'), prisma)
  fs.writeFileSync(
    path.join(__dirname, './data/result.json'),
    JSON.stringify(arrayData, null, 2)
  )
}

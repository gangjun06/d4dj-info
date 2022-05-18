import fs from 'fs'
import path from 'path'
import { modelSetting } from '../data.js'
import { Field, ResultType } from '../types/index.js'
import {
  EnumMemberRegex,
  EnumRegex,
  MasterRegex,
  TypeRegex,
  upperFirst,
} from '../utils.js'

const __dirname = path.resolve()

const extraFields: { [key: string]: Field[] } = {}

const nameConverter = (
  name: string,
  { modelName }: { modelName: string; type: string }
): [converted: string | null, extra: { type: string } | null] => {
  const setting = modelSetting[modelName]
  name = name.replace(/__/g, '')
  name = name[0].toLowerCase() + name.slice(1)
  if (name === 'id') {
    return ['masterId', null]
  } else if (name.endsWith('PrimaryKey')) {
    const fieldName = name.slice(0, -10)
    name = fieldName + 'Id'
    if (!setting || !setting.fields) {
      return [name, null]
    }
    const settingFields = setting.fields.find(
      (d) =>
        (typeof d.key === 'object' && d.key.includes(fieldName)) ||
        d.key === fieldName
    )
    if (!settingFields) {
      return [null, null]
    }

    if (!extraFields[modelName]) {
      extraFields[modelName] = []
    }

    const { type, ref } = settingFields
    let { refField } = settingFields

    refField = refField.replace(/\$/, upperFirst(fieldName))

    if (type === 'ManyToMany') {
      extraFields[modelName].push({
        key: fieldName,
        value: `${ref}[]`,
        extra: [
          {
            name: 'relation',
            parameters: [{ value: `"${modelName}_${upperFirst(fieldName)}"` }],
          },
        ],
      })
      if (!extraFields[ref]) extraFields[ref] = []
      extraFields[ref].push({
        key: refField,
        value: `${modelName}[]`,
        extra: [
          {
            name: 'relation',
            parameters: [{ value: `"${modelName}_${upperFirst(fieldName)}"` }],
          },
        ],
      })
    } else if (type === 'OneToMany') {
      extraFields[modelName].push({
        key: fieldName,
        value: `${ref}`,
        extra: [
          {
            name: 'relation',
            parameters: [
              { key: 'fields', value: [`${name}`] },
              { key: 'references', value: ['id'] },
            ],
          },
        ],
      })
      if (!extraFields[ref]) extraFields[ref] = []
      extraFields[ref].push({
        key: refField,
        value: `${modelName}[]`,
      })
      return [name, { type: 'String' }]
    } else if (type === 'ManyToOne') {
    } else {
      extraFields[modelName].push({
        key: fieldName,
        value: `${ref}`,
        extra: [
          {
            name: 'relation',
            parameters: [
              { key: 'fields', value: [`${name}`] },
              { key: 'references', value: ['id'] },
            ],
          },
        ],
      })
      if (!extraFields[ref]) extraFields[ref] = []
      extraFields[ref].push({
        key: refField,
        value: `${modelName}[]`,
      })
      return [name, { type: 'String' }]
    }

    return [null, null]
  }
  return [name, null]
}

const typeConverter = (type: string): [converted: string, noType: boolean] => {
  switch (type) {
    case 'bool':
      return ['Boolean', false]
    case 'bool[]':
      return ['Boolean[]', false]
    case 'int':
      return ['Int', false]
    case 'int[]':
      return ['Int[]', false]
    case 'float':
    case 'long':
      return ['Float', false]
    case 'float[]':
    case 'long[]':
      return ['Float[]', false]
    case 'string':
      return ['String', false]
    case 'string[]':
      return ['String[]', false]
    case 'DateTime':
      return ['DateTime', false]
    case 'DateTime[]':
      return ['DateTime', false]
    default:
      return [type, true]
  }
}

export const parseDump = (): Map<string, ResultType> => {
  const file = fs.readFileSync(path.join(__dirname, './data/dump.cs'))
  const fileStr = file.toString().split('\n')

  const result: Map<string, ResultType> = new Map()

  const enumTarget: string[] = []

  let curData: ResultType | null = null
  let prevLine = ''

  // Parsing Master
  fileStr.forEach((line) => {
    if (curData) {
      const match = line.match(TypeRegex)
      if (prevLine.includes('[KeyAttribute]') && match) {
        const [, type, name] = match
        const [typeConverted, noType] = typeConverter(type)
        const [nameConverted, extra] = nameConverter(name, {
          modelName: curData.name,
          type: typeConverted,
        })

        if (noType) enumTarget.push(typeConverted.replace(/\[\]/, ''))

        if (nameConverted) {
          curData.fields.push({
            key: nameConverted,
            value: extra?.type ?? typeConverted,
          })
        }
      } else if (line === '}') {
        curData.fields.unshift({
          key: 'id',
          value: 'String',
          extra: [{ name: 'id' }],
        })
        curData.fields.push({
          key: 'region',
          value: 'Region',
        })
        result.set(curData.name, curData!)
        curData = null
      }
      prevLine = line
      return
    }

    const match = line.match(MasterRegex)
    if (match) {
      curData = { name: match[1], type: 'Master', fields: [] }
    }
  })

  // Parsing ENUM
  fileStr.forEach((line) => {
    if (curData) {
      const match = line.match(EnumMemberRegex)
      if (match) {
        const [, , name, value] = match
        curData.fields.push({ key: name, value })
      } else if (line === '}') {
        result.set(curData.name, curData!)
        curData = null
      }
      return
    }

    const match = line.match(EnumRegex)
    if (match && prevLine !== '// Namespace: UnityEngine') {
      if (enumTarget.includes(match[1])) {
        curData = { name: match[1], type: 'Enum', fields: [] }
      }
    }
    prevLine = line
  })

  result.forEach((value, key) => {
    const extra = extraFields[key]
    if (extra) {
      result.set(key, { ...value, fields: [...value.fields, ...extra] })
    }
  })

  return result
}

import fs from 'fs'
import path from 'path'
import { modelSetting } from '../data.js'
import { Field, RelationType, ResultType } from '../types/index.js'
import {
  EnumMemberRegex,
  EnumRegex,
  formatText,
  MasterRegex,
  TypeRegex,
  upperFirst,
} from '../utils.js'

const __dirname = path.resolve()

const extraFields: { [key: string]: Field[] } = {}

const typeConverter = (type: string): [converted: string, noType: boolean] => {
  switch (type) {
    case 'bool':
      return ['boolean', false]
    case 'bool[]':
      return ['boolean[]', false]
    case 'int':
      return ['number', false]
    case 'int[]':
      return ['number[]', false]
    case 'float':
    case 'long':
      return ['number', false]
    case 'float[]':
    case 'long[]':
      return ['number[]', false]
    case 'string':
      return ['string', false]
    case 'string[]':
      return ['string[]', false]
    case 'DateTime':
      return ['Date', false]
    case 'DateTime[]':
      return ['Date', false]
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
      if (prevLine.includes('[Key') && match) {
        const [, type, name] = match
        const [typeConverted, noType] = typeConverter(type)

        if (noType) enumTarget.push(typeConverted.replace(/\[\]/, ''))

        curData.fields.push({
          key: formatText(name),
          value: typeConverted,
        })
      } else if (line === '}') {
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

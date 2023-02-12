import { ResultType } from '../types/index.js'
import { parseDump } from './parse.js'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

export const generate = () => {
  const source = parseDump()

  let result = ``
  const arrayData: ResultType[] = Array.from(source.values()).sort()

  arrayData.forEach((item) => {
    if (item.type === 'Master') {
      result += `export type ${item.name} = {\n`
      item.fields.forEach(({ key, value }) => {
        result += `  ${key}: ${value}\n`
      })
      result += '}\n\n'
    } else if (item.type === 'Enum') {
      result += `export enum ${item.name} {\n`
      item.fields.forEach((field) => {
        result += `  ${field.key},\n`
      })
      result += '}\n\n'
    }
  })

  fs.writeFileSync(path.join(__dirname, './data/generated.ts'), result)
}

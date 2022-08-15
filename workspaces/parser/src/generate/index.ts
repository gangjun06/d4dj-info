import * as data from '../data.js'
import { resultToPrisma } from './codegen.js'
import { parseDump } from './parse.js'

export const generate = () => {
  const result = parseDump()
  resultToPrisma(result, data.prismaBase, data.prismaExtra)
}

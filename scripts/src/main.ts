// refference: https://github.com/GEEKiDoS/D4DJ-Tools/blob/master/Scripts/Generate.csx

import { codeGenerate } from './generate.js'
import { parse } from './parse.js'

const main = () => {
  const argv = process.argv[2]
  if (argv === '--generate') {
    codeGenerate()
  } else {
    parse()
  }
}

main()

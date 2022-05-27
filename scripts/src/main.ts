// refference: https://github.com/GEEKiDoS/D4DJ-Tools/blob/master/Scripts/Generate.csx

import { generate } from './generate/index.js'
import { parse } from './parse/index.js'

const main = async () => {
  const argv = process.argv[2]
  if (argv === '--generate') {
    generate()
  } else {
    await parse()
  }
}

main()

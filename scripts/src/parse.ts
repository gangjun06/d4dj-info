import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

export const parse = () => {
  const json = fs.readFileSync(path.join(__dirname, '../data/result.json'))
  const data = JSON.parse(json.toString())
}

import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { modelSetting } from '../data.js'
import { ResultType } from '../types/index.js'
import { formatText, lowerFirst, upperFirst } from '../utils.js'

const __dirname = path.resolve()

const prisma = new PrismaClient()

const fetchMaster = async (region: string, name: string) => {
  const url = `https://asset.d4dj.info/${region}/Master/${name}.json`
  const res = await axios.get(url)
  return res.data
}

const parseTarget = async (region: string, name: string) => {
  const masterJSON = await fetchMaster(region, name)
  const data = await prisma[lowerFirst(name) as 'characterMaster'].findMany()
  const createData: any = []

  const setting = modelSetting[name]

  let useCreateMany = true

  for (const key in masterJSON) {
    const newData: any = {}
    const field: any = masterJSON[key]

    // Set Model ID (not setting -> MasterID-Region)
    if (setting && setting.id) {
      newData['id'] = setting.id
        .map((name) => field[upperFirst(name)])
        .concat(region)
        .join('-')
    } else {
      newData['id'] = `${field['Id']}-${region}`
    }

    newData['region'] = region

    if (data.find(({ id }) => id === newData['id'])) {
      continue
    }
    for (const key2 in field) {
      if (key2 === 'Id') {
        newData['masterId'] = field[key2]
      } else {
        const formated = formatText(key2)
        if (formated.endsWith('PrimaryKey')) {
          if (Array.isArray(field[key2])) {
            useCreateMany = false
            newData[formated.slice(0, -10)] = {
              connect: field[key2].map((d: number) => ({
                id: `${d}-${region}`,
              })),
            }
          } else {
            newData[`${formated.slice(0, -10)}Id`] = `${field[key2]}-${region}`
          }
        } else {
          newData[formated] = field[key2]
        }
      }
    }

    createData.push(newData)
  }

  if (useCreateMany) {
    await prisma[lowerFirst(name) as 'characterMaster'].createMany({
      data: createData,
    })
    return
  }

  const chunkSize = 13
  for (let i = 0; i < createData.length; i += chunkSize) {
    const chunk = createData.slice(i, i + chunkSize)
    await Promise.all(
      chunk.map((data: any) =>
        prisma[lowerFirst(name) as 'characterMaster'].create({
          data,
        })
      )
    )
  }
}

export const parse = async (name?: string) => {
  await prisma.$connect()
  const region = 'jp'

  const json = fs.readFileSync(path.join(__dirname, 'data/result.json'))
  const data = JSON.parse(json.toString()) as ResultType[]

  const dataObj: { [key: string]: ResultType } = data.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: { ...item } }),
    {}
  )

  if (name) {
    const d = data.find((d) => d.name === name)
    if (d) {
      await parseTarget(region, d.name)
    }
    return
  }

  const doneList: { [key: string]: boolean } = {}

  const parseReculsive = async (name: string, reculsive: boolean) => {
    if (doneList[name]) return
    doneList[name] = true
    console.info(`[START] ${name}`)
    if (reculsive) {
      const fields = dataObj[name].fields
      for (const item of fields) {
        if (!item.extra || item.note !== 'origin') continue

        for (const item2 of item.extra) {
          if (item2.name === 'relation') {
            await parseReculsive(item.value.replace(/\[\]/, ''), true)
            break
          }
        }
      }
    }

    await parseTarget(region, name)
    console.info(`[DONE] ${name}`)
  }

  const preParse = ['RewardMaster', 'ConditionMaster']
  // const preParse = []
  for (const item of preParse) {
    await parseReculsive(item, false)
  }

  for (const item of data) {
    if (item.type !== 'Master') continue
    await parseReculsive(item.name, true)
  }
}

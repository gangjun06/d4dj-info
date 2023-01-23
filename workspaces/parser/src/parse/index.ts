import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'
import * as datefns from 'date-fns'
import fs from 'fs'
import path from 'path'
import { modelSetting } from '../data.js'
import { Field, ResultType } from '../types/index.js'
import { formatText, lowerFirst } from '../utils.js'

const __dirname = path.resolve()

const prisma = new PrismaClient()

const fetchMaster = async (region: string, name: string) => {
  const url = `https://cdn.d4dj.info/${region}/Master/${name}.json`
  const res = await axios.get(url)
  return res.data
}

const parseTarget = async (
  region: string,
  name: string,
  resultType: ResultType
) => {
  let masterJSON = {}
  try {
    masterJSON = await fetchMaster(region, name)
  } catch (e) {
    console.log(`[ERROR] File ${name} Not Found`)
    return
  }
  const data = await prisma[lowerFirst(name) as 'characterMaster'].findMany()
  const createData: any = []

  const setting = modelSetting[name]
  let useCreateMany = true
  const resultTypeFieldsObj: { [key: string]: Field } =
    resultType.fields.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: { ...item } }),
      {}
    )

  for (const key in masterJSON) {
    const newData: any = {}
    const field: { [key: string]: any } = Object.keys(masterJSON[key]).reduce(
      (prev, cur) => ({ ...prev, [formatText(cur)]: masterJSON[key][cur] }),
      {}
    )

    // Set Model ID (not setting -> MasterID-Region)
    if (setting && setting.id) {
      newData['id'] = setting.id
        .map((name) => field[name])
        .concat(region)
        .join('-')
    } else {
      newData['id'] = `${field['id']}-${region}`
    }

    newData['region'] = region

    if (data.find(({ id }) => id === newData['id'])) {
      continue
    }
    for (const key2 in field) {
      if (key2 === 'id') {
        newData['masterId'] = field[key2]
      } else {
        if (key2.endsWith('PrimaryKey')) {
          if (
            !setting ||
            !setting.fields ||
            !setting.fields[key2.slice(0, -10)]
          ) {
            continue
          }
          if (Array.isArray(field[key2])) {
            useCreateMany = false
            newData[key2.slice(0, -10)] = {
              connect: field[key2].map((d: number) => ({
                id: `${d}-${region}`,
              })),
            }
          } else {
            newData[`${key2.slice(0, -10)}Id`] = `${field[key2]}-${region}`
          }
        } else {
          if (resultTypeFieldsObj[key2]?.value === 'DateTime') {
            const parsed = datefns.parseISO(field[key2])
            newData[key2] = datefns.sub(parsed, { hours: 9 })
          } else {
            newData[key2] = field[key2]
          }
        }
      }
    }

    createData.push(newData)
  }

  if (useCreateMany) {
    try {
      await prisma[lowerFirst(name) as 'characterMaster'].createMany({
        data: createData,
      })
      return
    } catch (e) {}
  }

  const chunkSize = 13
  for (let i = 0; i < createData.length; i += chunkSize) {
    const chunk = createData.slice(i, i + chunkSize)
    try {
      await Promise.all(
        chunk.map((data: any) =>
          prisma[lowerFirst(name) as 'characterMaster'].create({
            data,
          })
        )
      )
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          console.log(e)
        }
      }
    }
  }
}

export const parse = async (region: string, name?: string) => {
  await prisma.$connect()

  const json = fs.readFileSync(path.join(__dirname, 'data/result.json'))
  const data = JSON.parse(json.toString()) as ResultType[]

  const dataObj: { [key: string]: ResultType } = data.reduce(
    (obj, item) => Object.assign(obj, { [item.name]: { ...item } }),
    {}
  )

  if (name) {
    const d = data.find((d) => d.name === name)
    console.log(d)
    if (d) {
      await parseTarget(region, d.name, dataObj[d.name])
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

    await parseTarget(region, name, dataObj[name])
    console.info(`[DONE] ${name}`)
  }

  const preParse = ['RewardMaster', 'ConditionMaster']
  // const preParse = ['EventPointRewardMaster']
  for (const item of preParse) {
    await parseReculsive(item, false)
  }

  for (const item of data) {
    if (item.type !== 'Master') continue
    await parseReculsive(item.name, true)
  }
}

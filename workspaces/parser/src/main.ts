// refference: https://github.com/GEEKiDoS/D4DJ-Tools/blob/master/Scripts/Generate.csx

import { PrismaClient, Region } from '@prisma/client'
import axios from 'axios'

import { generate } from './generate/index.js'
import { CardMaster, CharacterMaster, UnitMaster } from './generated.js'
import { formatText } from './utils.js'
// import { parse } from './parse/index.js'

const fetchMaster = async (region: string, name: string) => {
  const res = await axios.get(
    `https://cdn.d4dj.info/${region}/Master/${name}Master.json`
  )
  console.log(res.data)
  return res.data
}

type ParseContentType<T, U extends boolean> = U extends true
  ? Omit<T, 'id'> & { id: string; masterId: number } & { region: Region }
  : T & { region: Region }

async function parse<T, U extends boolean = false>(
  {
    region,
    name,
    masterId,
  }: {
    region: Region
    name: string
    masterId?: U
  },
  parser: (content: ParseContentType<T, U>[]) => Promise<void>
) {
  console.log('Start Parsing: ', name)
  try {
    const data = await fetchMaster(region, name)

    const arrayData = Object.entries(data).map(([, value]) => {
      const result = {
        ...Object.entries(value).reduce((prev, [key, value]) => {
          return {
            ...prev,
            [formatText(key)]: value,
          }
        }, {}),
      } as ParseContentType<T, U>
      if (masterId) {
        result['masterId'] = result['id']
        result['id'] = `${result['masterId']}-${region}`
      }
      result['region'] = region

      return result
    })
    await parser(arrayData as ParseContentType<T, U>[])
    console.log('SUCCESS: ', name)
  } catch (e) {
    console.log('Error parsing: ', name)
    console.error(e)
  }
  console.log('-----------------------')
}

const prisma = new PrismaClient()

const main = async () => {
  const argv = process.argv[2]
  if (argv === '--generate') {
    generate()
    return
  }

  await prisma.$connect()

  if (!['en', 'jp'].includes(argv)) {
    return
  }

  // @ts-ignore
  const region: Region = argv

  await parse<UnitMaster, true>({ region, name: 'Unit' }, async (content) => {
    await prisma.unitMaster.createMany({
      data: content,
      skipDuplicates: true,
    })
  })

  await parse<CharacterMaster, true>(
    { region, name: 'Character' },
    async (content) => {
      await prisma.characterMaster.createMany({
        data: content.map((item) => ({
          ...item,
          unitId: `${item.unitPrimaryKey}-${region}`,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<CardMaster, true>({ region, name: 'Card' }, async (content) => {
    await prisma.cardMaster.createMany({
      data: content.map(
        ({
          characterPrimaryKey,
          rarityPrimaryKey,
          attributePrimaryKey,
          passiveSkillPrimaryKey: _passiveSkillPrimaryKey,
          ...other
        }) => ({
          ...other,
          characterId: `${characterPrimaryKey}-${region}`,
          rarity: rarityPrimaryKey,
          attribute: attributePrimaryKey,
        })
      ),
      skipDuplicates: true,
    })
  })
}

main()

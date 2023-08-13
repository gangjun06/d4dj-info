// refference: https://github.com/GEEKiDoS/D4DJ-Tools/blob/master/Scripts/Generate.csx

import {
  ChartDifficulty,
  ChartSectionType,
  EventAggregationType,
  EventEpisodeType,
  EventType,
  GachaCategory,
  HonorType,
  MusicCategory,
  PrismaClient,
  Region,
  StampCategory,
  StockCategory,
} from '@prisma/client'
import axios from 'axios'

import { generate } from './generate/index.js'
import {
  CardMaster,
  CharacterMaster,
  ChartDesignerMaster,
  ChartMaster,
  EventAggregationBaseMaster,
  EventMaster,
  GachaExplanationWordMaster,
  GachaMaster,
  GachaNotesWordMaster,
  GachaSummaryWordMaster,
  HonorMaster,
  MusicMaster,
  MusicMixMaster,
  SkillMaster,
  StampMaster,
  StockMaster,
  StockViewCategoryMaster,
  UnitMaster,
} from './generated.js'
import { formatText } from './utils.js'
// import { parse } from './parse/index.js'

const fetchMaster = async (region: string, name: string) => {
  const res = await axios.get(
    `https://cdn.d4dj.info/${region}/Master/${name}Master.json`
  )
  return res.data
}

type ParseContentType<T, U extends boolean> = U extends true
  ? Omit<T, 'id'> & { id: string; masterId: number } & { region: Region }
  : T & { region: Region }

const allowList = []

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
  if (allowList.length !== 0 && !allowList.includes(name)) return
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

  await parse<UnitMaster, true>(
    { region, name: 'Unit', masterId: true },
    async (content) => {
      await prisma.unitMaster.createMany({
        data: content,
        skipDuplicates: true,
      })
    }
  )

  await parse<CharacterMaster, true>(
    { region, name: 'Character', masterId: true },
    async (content) => {
      await prisma.characterMaster.createMany({
        data: content.map(({ unitPrimaryKey, ...other }) => ({
          ...other,
          unitId: `${unitPrimaryKey}-${region}`,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<SkillMaster, true>(
    { region, name: 'Skill', masterId: true },
    async (content) => {
      await prisma.skillMaster.createMany({
        data: content,
        skipDuplicates: true,
      })
    }
  )

  await parse<CardMaster, true>(
    { region, name: 'Card', masterId: true },
    async (content) => {
      await prisma.cardMaster.createMany({
        data: content.map(
          ({
            characterPrimaryKey,
            rarityPrimaryKey,
            attributePrimaryKey,
            passiveSkillPrimaryKey: _passiveSkillPrimaryKey,
            skillParameterPrimaryKey,
            ...other
          }) => ({
            ...other,
            characterId: `${characterPrimaryKey}-${region}`,
            rarity: rarityPrimaryKey,
            attribute: attributePrimaryKey,
            skillParameterId: `${skillParameterPrimaryKey}-${region}`,
          })
        ),
        skipDuplicates: true,
      })
    }
  )

  await parse<ChartDesignerMaster, true>(
    { region, name: 'ChartDesigner', masterId: true },
    async (content) => {
      await prisma.chartDesignerMaster.createMany({
        data: content.map(({ ...other }) => ({
          ...other,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<MusicMaster, true>(
    { region, name: 'Music', masterId: true },
    async (content) => {
      await prisma.musicMaster.createMany({
        data: content.map(
          ({
            unitPrimaryKey,
            purchaseBonusesPrimaryKey: _purchaseBonusesPrimaryKey,
            category,
            sectionTrend,
            ...other
          }) => ({
            ...other,
            unitId: `${unitPrimaryKey}-${region}`,
            category: MusicCategory[category],
            sectionTrend: ChartSectionType[sectionTrend],
          })
        ),
        skipDuplicates: true,
      })
    }
  )

  await parse<MusicMixMaster, true>(
    { region, name: 'MusicMix', masterId: true },
    async (content) => {
      await prisma.musicMixMaster.createMany({
        data: content.map(({ section, musicPrimaryKey, ...other }) => ({
          ...other,
          section: ChartSectionType[section],
          musicId: `${musicPrimaryKey}-${region}`,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<ChartMaster, true>(
    { region, name: 'Chart', masterId: true },
    async (content) => {
      await prisma.chartMaster.createMany({
        data: content.map(
          ({ difficulty, designerPrimaryKey, musicPrimaryKey, ...other }) => ({
            ...other,
            difficulty: ChartDifficulty[difficulty],
            musicId: `${musicPrimaryKey}-${region}`,
            designerId: `${designerPrimaryKey}-${region}`,
          })
        ),
        skipDuplicates: true,
      })
    }
  )

  await parse<EventMaster, true>(
    { region, name: 'Event', masterId: true },
    async (content) => {
      await prisma.eventMaster.createMany({
        data: content.map(({ episodeType, type, ...other }) => ({
          ...other,
          episodeType: EventEpisodeType[episodeType] ?? 'Unknown',
          type: EventType[type],
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<EventAggregationBaseMaster, true>(
    { region, name: 'EventAggregationBase', masterId: true },
    async (content) => {
      await prisma.eventAggregationBaseMaster.createMany({
        data: content.map(({ aggregationType, eventPrimaryKey, ...other }) => ({
          ...other,
          aggregationType:
            EventAggregationType[aggregationType] ??
            EventAggregationType['None'],
          eventId: `${eventPrimaryKey}-${region}`,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<GachaSummaryWordMaster, true>(
    { region, name: 'GachaSummaryWord', masterId: true },
    async (content) => {
      await prisma.gachaSummaryWordMaster.createMany({
        data: content.map(({ ...other }) => ({
          ...other,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<GachaExplanationWordMaster, true>(
    { region, name: 'GachaExplanationWord', masterId: true },
    async (content) => {
      await prisma.gachaExplanationWordMaster.createMany({
        data: content.map(({ ...other }) => ({
          ...other,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<GachaNotesWordMaster, true>(
    { region, name: 'GachaNotesWord', masterId: true },
    async (content) => {
      await prisma.gachaNotesWordMaster.createMany({
        data: content.map(({ ...other }) => ({
          ...other,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<GachaMaster, true>(
    { region, name: 'Gacha', masterId: true },
    async (content) => {
      await prisma.gachaMaster.createMany({
        data: content.map(
          ({
            notePrimaryKey,
            detailPrimaryKey,
            summaryPrimaryKey,
            pickUpCardsPrimaryKey,
            tableRatesPrimaryKey: _tableRatesPrimaryKey,
            selectBonusCardsPrimaryKey: _selectBonusCardsPrimaryKey,
            homeAnimationCardsPrimaryKey: _homeAnimationCardsPrimaryKey,
            selectBonusRewardsPrimaryKey: _selectBonusRewardsPrimaryKey,
            category,
            type,
            ...other
          }) => ({
            ...other,
            pickUpCardsPrimaryKey,
            noteId: `${notePrimaryKey}-${region}`,
            detailId: `${detailPrimaryKey}-${region}`,
            summaryId: `${summaryPrimaryKey}-${region}`,
            category: GachaCategory[category] ?? 'Unknown',
            type: GachaCategory[type] ?? 'Unknown',
          })
        ),
        skipDuplicates: true,
      })
    }
  )

  await parse<StampMaster, true>(
    { region, name: 'Stamp', masterId: true },
    async (content) => {
      await prisma.stampMaster.createMany({
        data: content.map(({ category, ...other }) => ({
          ...other,
          category: StampCategory[category],
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<HonorMaster, true>(
    { region, name: 'Honor', masterId: true },
    async (content) => {
      await prisma.honorMaster.createMany({
        data: content.map(({ type, ...other }) => ({
          ...other,
          type: HonorType[type] ?? 'Unknown',
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<StockViewCategoryMaster, true>(
    { region, name: 'StockViewCategory', masterId: true },
    async (content) => {
      await prisma.stockViewCategoryMaster.createMany({
        data: content.map(({ ...other }) => ({
          ...other,
        })),
        skipDuplicates: true,
      })
    }
  )

  await parse<StockMaster, true>(
    { region, name: 'Stock', masterId: true },
    async (content) => {
      await prisma.stockMaster.createMany({
        data: content.map(({ viewCategoryPrimaryKey, category, ...other }) => ({
          ...other,
          viewCategoryId: `${viewCategoryPrimaryKey}-${region}`,
          category: StockCategory[category] ?? 'Unknown',
        })),
        skipDuplicates: true,
      })
    }
  )
}

main()

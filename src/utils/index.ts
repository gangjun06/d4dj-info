import Cookies from 'js-cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  Attribute,
  FindListOptionSet,
  FindListType,
  Region,
  Unit,
} from '../models'
import { pad } from './num'

export * from './array'
export * from './constants'
export * from './image'
export * from './num'
export * from './time'
export * from './useDelayUnmount'

export const loadRegion = (): Region => {
  const region = Cookies.get('region')
  const index = Object.keys(Region).findIndex(
    //@ts-ignore
    (item) => Region[item as any] === region
  )
  if (index !== -1) {
    return region as Region
  }
  Cookies.set('region', Region.Japan)
  return Region.Japan
}

export enum GetURLType {
  Live2DModelURL,
  CharaIcon,
  CharaLiveStart,
  CharaRankHeader,
  CharaSilhouette,
  CharaProfile,
  CardIcon,
  CardBigIcon,
  CardStandUp,
  CardFrameIcon,
  CardAttributeIcon,
  CardUnitIcon,
  CardRarityIcon,
  CardSD,
  CardTransparent,
  CardIllust,
  MusicJacket,
  EventTitleLogo,
  EventBackground,
  EventBanner,
  EventBannerNotice,
  GachaBanner,
  GachaLive2DBG,
  GachaTopBanner,
  Honor,
  Stamp,
  Stock,
  StockFrameless,
}

const urlList: {
  [key in GetURLType]: [string, string] | ((p: any[]) => [string, string?])
} = {
  [GetURLType.Live2DModelURL]: (p: any[]) => [
    `AssetBundles/Live2D/${p[0]}/${p[0]}.model3.json`,
  ],
  // ID
  [GetURLType.CharaIcon]: (p: any[]) => [
    `adv/ondemand/chara_icon/adv_icon_${pad(p[0], 3)}.png`,
    `Character Icon ${p[0]}`,
  ],
  // Attribute, Character
  [GetURLType.CharaLiveStart]: (p: any[]) => [
    `LiveStartCutin/${pad(p[0] || 0, 2)}/LiveStartChara${pad(p[1], 3)}.png`,
    `live start cutin ${p[0]}-${p[1]}`,
  ],
  // Character
  [GetURLType.CharaRankHeader]: (p: any[]) => [
    `ondemand/character/character_rank_header_${pad(p[0], 3)}.png`,
    `rank header ${p[0]}`,
  ],
  // Character
  [GetURLType.CharaProfile]: (p: any[]) => [
    `ondemand/character_profile/character_profile_${pad(p[0], 3)}.jpg`,
    `character profile ${p[0]}`,
  ],
  // Character
  [GetURLType.CharaSilhouette]: (p: any[]) => [
    `ondemand/character/gacha_silhouette_${pad(p[0], 3)}.png`,
    `gacha silhouette ${p[0]}`,
  ],
  // CardID, 0/1
  [GetURLType.CardIcon]: (p: any[]) => [
    `ondemand/card_icon/card_icon_${pad(p[0], 9)}_${p[1]}.jpg`,
    `Card Icon ${p[0]}-${p[1]}`,
  ],
  // StockID
  [GetURLType.Stock]: (p: any[]) => [
    `ondemand/stock_icon/stock_icon_${pad(p[0], 5)}.png`,
    `Stock Icon ${p[0]}`,
  ],
  // StockID
  [GetURLType.StockFrameless]: (p: any[]) => [
    `ondemand/stock_icon_frameless/stock_icon_${pad(p[0], 5)}_frameless.png`,
    `Stock Icon ${p[0]}`,
  ],
  // HnonrID
  [GetURLType.Honor]: (p: any[]) => [
    `ondemand/honor/honor_${pad(p[0], 5)}.png`,
    `Honor Icon ${p[0]}`,
  ],
  // CardID, 0/1
  [GetURLType.CardBigIcon]: (p: any[]) => [
    `ondemand/card_bigIcon/card_bigIcon_${pad(p[0], 9)}_${p[1]}.jpg`,
    `Card Big Icon ${p[0]}-${p[1]}`,
  ],
  // CardID, 0/1
  [GetURLType.CardStandUp]: (p: any[]) => [
    `ondemand/character/character_stand_up_${pad(p[0], 3)}.png`,
    `Card Stand Up ${p[0]}`,
  ],
  // Rarity, Attribute
  [GetURLType.CardFrameIcon]: (p: any[]) => [
    `game/Frame_${p[0]}${
      p[0] === 1 ? `_${Attribute[p[1] as Attribute]}` : ''
    }.png`,
  ],
  // Attribute
  [GetURLType.CardAttributeIcon]: (p: any[]) => [
    `game/Type_${Attribute[p[0] as Attribute]}.png`,
  ],
  // Unit
  [GetURLType.CardUnitIcon]: (p: any[]) => [
    `game/Unit_${Unit[p[0] as Unit]}.png`,
  ],
  // Rarity
  [GetURLType.CardRarityIcon]: (p: any[]) => [
    `game/Rarity${p[0] > 4 ? '_Sp' : ''}_Evolution.png`,
  ],
  // cardID, ImageID
  [GetURLType.CardSD]: (p: any[]) => [
    `ondemand/sd_card_chara/sd_card_chara_${pad(p[0], 9)}_${p[1]}.png`,
    `sd_card_chara ${p[0]}`,
  ],
  // cardID, 0/1
  [GetURLType.CardTransparent]: (p: any[]) => [
    `AssetBundles/images/card_chara_transparent_${pad(p[0], 9)}_${p[1]}.png`,
    `card illust ${p[0]}-${p[1]}`,
  ],
  // cardID, 0/1
  [GetURLType.CardIllust]: (p: any[]) => [
    `ondemand/card_chara/card_chara_${pad(p[0], 9)}_${p[1]}.jpg`,
    `card illust ${p[0]}-${p[1]}`,
  ],
  // musicID
  [GetURLType.MusicJacket]: (p: any[]) => [
    `music_jacket/music_jacket_${pad(p[0], 7)}.jpg`,
    `music jacket ${p[0]}`,
  ],
  // eventID
  [GetURLType.EventTitleLogo]: (p: any[]) => [
    `ondemand/event/event_${p[0]}/title_logo.png`,
    `event title logo ${p[0]}`,
  ],
  // eventID
  [GetURLType.EventBackground]: (p: any[]) => [
    `ondemand/event/event_${p[0]}/background.jpg`,
    `event background ${p[0]}`,
  ],
  // eventID
  [GetURLType.EventBanner]: (p: any[]) => [
    `ondemand/event/event_${p[0]}/banner_event.png`,
    `event banner event ${p[0]}`,
  ],
  // eventID
  [GetURLType.EventBannerNotice]: (p: any[]) => [
    `ondemand/event/event_${p[0]}/banner_event_notice.png`,
    `event banner notice ${p[0]}`,
  ],
  // gachaID
  [GetURLType.GachaBanner]: (p: any[]) => [
    `ondemand/banner/banner_gacha_${pad(p[0], p[0] < 10 ? 4 : 5)}.png`,
    `gacha banner ${p[0]}`,
  ],
  // gachaID
  [GetURLType.GachaTopBanner]: (p: any[]) => [
    `ondemand/gacha/top/banner/${p[0]}.png`,
    `gacha banner ${p[0]}`,
  ],
  // gachaID
  [GetURLType.GachaLive2DBG]: (p: any[]) => [
    `ondemand/gacha/top/live2d_bg/card_background_${pad(p[0], 9)}_1.jpg`,
    `gacha live2d background ${p[0]}`,
  ],
  // stampID
  [GetURLType.Stamp]: (p: any[]) => [
    `ondemand/stamp/stamp_${pad(p[0], 5)}.png`,
    `stamp ${p[0]}`,
  ],
}

export const getURL = ({
  server,
  type,
  parameter,
  fullURL = false,
}: {
  server: string
  type: GetURLType
  parameter?: any[]
  fullURL?: boolean
}) => {
  const target = urlList[type]
  let result = ''
  if (typeof target === 'object') {
    result = target[0]
  } else {
    result = target(parameter!)[0]
  }

  if (fullURL) {
    return `https://cdn.d4dj.info/${
      result.startsWith('game') ? '' : `${server}/`
    }${result}`
  }
  return `${result.startsWith('game') ? '' : `${server}/`}${result}`
}

export const getAlt = ({
  type,
  parameter,
}: {
  type: GetURLType
  parameter?: any[]
}) => {
  const target = urlList[type]
  if (typeof target === 'object') {
    return target[1] || '.'
  } else {
    return target(parameter!)[1] || '.'
  }
}

export const generateFilter = <T>(
  data: {
    [key: string]: string[] | number[]
  },
  ...etc: any
): T => {
  return {
    and: Object.keys(data).map((key) => ({
      or: data[key].map((item) =>
        key.split('.').reduceRight(
          //@ts-ignore
          (obj, next) => ({
            [next]: obj,
          }),
          { eq: item }
        )
      ),
      ...etc,
    })),
  } as unknown as T
}

export const parseFilterQuery = (query: any) => {
  const newData: any = {}
  const keys = Object.keys(query)
  if (keys.length < 1) {
    return null
  }
  keys.forEach((key) => {
    const data = query[key]
    if (key === 'sort' || key === 'sortBy') {
      newData[key] = data
    } else {
      if (typeof data === 'string' && data !== '') {
        newData[key] = data.split(',')
      }
    }
  })
  return newData
}

export const convertID = (id: string) => id.slice(0, -3)
export const convertIDNum = (id: string) => parseInt(convertID(id))

export const badRequest = (res: NextApiResponse) =>
  res.status(400).json({ msg: 'Bad Request' })

export const getPagination = (
  cursor: string | undefined,
  pageSize: number
) => ({
  ...(cursor
    ? {
        cursor: { id: cursor },
      }
    : {}),
  take: pageSize,
  skip: cursor ? 1 : 0,
})

export const convertListReq = (
  req: NextApiRequest,
  option: FindListOptionSet<any>
): {
  where: any
  sortBy: any
  region: string
  pagination: any
  detail?: string
} => {
  const { cursor, sort, sortBy, detail } = req.query
  if (detail && typeof detail === 'string') {
    return {
      detail,
      where: null,
      sortBy: null,
      pagination: null,
      region: '',
    }
  }

  const filterData = {
    ...req.query,
  }
  delete filterData['cursor']
  delete filterData['sort']
  delete filterData['sortBy']
  delete filterData['region']

  const region = (req.query.region as Region) ?? 'jp'
  let where = {}
  let sortByData = {}

  for (const key in filterData) {
    const field = option.fields[key.replace('[]', '')]
    let queryData = req.query[key]
    if (!field) throw new Error('Bad Request')
    if (field.type === FindListType.Checkbox) {
      if (!Array.isArray(queryData)) queryData = [queryData]
      // Filter query has correct option value
      if (
        queryData.filter(
          (d) => field.options!.findIndex(({ value }) => value === d) < 0
        ).length
      )
        throw new Error('Bad Request')

      where = {
        ...where,
        ...(field.customOptionHandler
          ? field.customOptionHandler(queryData, region)
          : {
              [field.name]: {
                in: queryData,
              },
            }),
      }
    } else if (field.type === FindListType.Input) {
      where = {
        ...where,
        ...(field.customOptionHandler
          ? field.customOptionHandler(queryData, region)
          : {}),
      }
    }
  }

  if (
    Array.isArray(region) ||
    Array.isArray(cursor) ||
    Array.isArray(sort) ||
    Array.isArray(sortBy)
  )
    throw new Error('Bad Request')

  sortByData = {
    [sortBy || option.sort.default]: sort,
  }

  return {
    where: {
      where: {
        region: {
          equals: region,
        },
        ...where,
      },
    },
    sortBy: {
      orderBy: sortByData,
    },
    pagination: getPagination(cursor, 30),
    region,
  }
}

export const strToObj = (key: string, value: any) =>
  key.split('.').reduceRight((prev, cur) => ({ [cur]: prev }), value)

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

const camelToSnakeCase = (str: string) => {
  const slice = str.slice(1)
  return `${str[0].toLowerCase()}${slice.replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`
  )}`
}

export const autoOptions = (baseLabel: string, enumField: any) =>
  Object.keys(enumField).map((key) => ({
    label: `${baseLabel}${camelToSnakeCase(enumField[key] as string)}`,
    value: enumField[key],
  }))

import Cookies from 'js-cookie'
import { Attribute, Region, Unit } from '../models'
import { pad } from './num'

export * from './array'
export * from './constants'
export * from './image'
export * from './num'
export * from './time'
export * from './useDelayUnmount'

export const loadRegion = (): Region => {
  const region = Cookies.get('region')
  const index = Object.keys(Region).findIndex((item) => item === region)
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
    return `https://asset.d4dj.info/${
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

export const generateFilter = <T>(data: {
  [key: string]: string[] | number[]
}): T => {
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
    })),
  } as unknown as T
}

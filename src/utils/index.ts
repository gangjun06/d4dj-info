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
  CardFrameIcon,
  CardAttributeIcon,
  CardUnitIcon,
  CardRarityIcon,
}

const urlList: {
  [key in GetURLType]: string | ((p: any[]) => string)
} = {
  [GetURLType.Live2DModelURL]: (p: any[]) =>
    `AssetBundles/Live2D/${p[0]}/${p[0]}.model3.json`,
  // ID
  [GetURLType.CharaIcon]: (p: any[]) =>
    `adv/ondemand/chara_icon/adv_icon_${pad(p[0], 3)}.png`,
  // Attribute, Character
  [GetURLType.CharaLiveStart]: (p: any[]) =>
    `LiveStartCutin/${pad(p[0] || 0, 2)}/LiveStartChara${pad(p[1], 3)}.png`,
  // Character
  [GetURLType.CharaRankHeader]: (p: any[]) =>
    `ondemand/character/character_rank_header_${pad(p[0], 3)}.png`,
  // Character
  [GetURLType.CharaProfile]: (p: any[]) =>
    `ondemand/character_profile/character_profile_${pad(p[0], 3)}.jpg`,
  // Character
  [GetURLType.CharaSilhouette]: (p: any[]) =>
    `ondemand/character/gacha_silhouette_${pad(p[0], 3)}.png`,
  // CardID, Card Rarity
  [GetURLType.CardIcon]: (p: any[]) =>
    `ondemand/card_icon/card_icon_${pad(p[0], 9)}_${p[1] > 2 ? '1' : '0'}.jpg`,
  // Rarity, Attribute
  [GetURLType.CardFrameIcon]: (p: any[]) =>
    `game/Frame_${p[0]}${
      p[0] === 1 ? `_${Attribute[p[1] as Attribute]}` : ''
    }.png`,
  // Attribute
  [GetURLType.CardAttributeIcon]: (p: any[]) =>
    `game/Type_${Attribute[p[0] as Attribute]}.png`,
  // Unit
  [GetURLType.CardUnitIcon]: (p: any[]) =>
    `game/Unit_${Unit[p[0] as Unit]}.png`,
  // Rarity
  [GetURLType.CardRarityIcon]: (p: any[]) =>
    `game/Rarity${p[0] > 4 ? '_Sp' : ''}_Evolution.png`,
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
  if (typeof target === 'string') {
    result = target
  } else {
    result = target(parameter!)
  }

  if (fullURL) {
    return `https://asset.d4dj.info/${
      result.startsWith('game') ? '' : `${server}/`
    }${result}`
  }
  return `${result.startsWith('game') ? '' : `${server}/`}${result}`
}

import Cookies from 'js-cookie'
import { Region } from '../models'
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
  CardIcon,
}

const urlList: {
  [key in GetURLType]: string | ((p: any[]) => string)
} = {
  [GetURLType.Live2DModelURL]: (p: any[]) =>
    `AssetBundles/Live2D/${p[0]}/${p[0]}.model3.json`,
  // CardID, Card Rarity
  [GetURLType.CardIcon]: (p: any[]) =>
    `ondemand/card_icon/card_icon_${pad(p[0], 9)}_${p[1] > 2 ? '1' : '0'}.jpg`,
}

export const getURL = (
  server: string,
  type: GetURLType,
  ...parameter: any[]
) => {
  const target = urlList[type]
  let result = ''
  if (typeof target === 'string') {
    result = target
  } else {
    result = target(parameter!)
  }

  return `https://asset.d4dj.info/${server}/${result}`
}

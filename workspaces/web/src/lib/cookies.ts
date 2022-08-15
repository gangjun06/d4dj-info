import { Region } from '@/models/index'
import { getCookie, setCookies } from 'cookies-next'

export const getRegionCookie = () => {
  const region = getCookie('region')?.toString()
  if (region !== 'jp' && region !== 'en') return Region.Global
  return region as Region
}

export const setRegionCookie = (region: Region) => {
  setCookies('region', region, {
    maxAge: -1,
  })
}

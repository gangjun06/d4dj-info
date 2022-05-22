import { ReactElement } from 'react'

export enum Region {
  // 'Korea' = 'ko-KR',
  'Global' = 'en',
  'Japan' = 'ja-JP',
}

export enum Attribute {
  Street = 1,
  Party = 2,
  Cute = 3,
  Cool = 4,
  Elegant = 5,
}

export enum Unit {
  HA = 1,
  PP = 2,
  PM = 3,
  MMD = 4,
  LND = 5,
  LL = 6,
  Common = 50,
}

export enum Rarity {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Special = 7,
}

export enum CardSort {
  ID = 'masterID',
  Name = 'cardName',
}

export enum MusicSort {
  ID = 'masterID',
  Name = 'name',
  DefaultOrder = 'defaultOrder',
  StartDate = 'startDate',
  BPM = 'musicBpm',
}

export enum MusicCategory {
  Instrumental = 'Instrumental',
  Original = 'Original',
  Cover = 'Cover',
  Game = 'Game',
  Collabo = 'Collabo',
}

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export enum FindListType {
  Checkbox = 'checkbox',
  Radio = 'radio',
  Input = 'input',
}

export type SimpleImage = {
  src: string
  width: string
  height: string
}

export type FindListOption = {
  type: FindListType
  label: string
  name: string
  options?: { label?: string; value: string; component?: ReactElement }[]
  placeholder?: string
  customOptionHandler?: (value: string[] | string, region: string) => any
}

export type FindListOptionSet<T> = {
  url: string
  fields: { [key: string]: FindListOption }
  sort: {
    default: string
    options: { label?: string; value: string; component?: ReactElement }[]
    customOptionHandler?: (value: string[], region: string) => any
  }
}

export type FindListReturn<T> = {
  data: T
}

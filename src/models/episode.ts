import { Character, Unit } from './character'

export type Episode = {
  category: string
  id: number
  conditionsPrimaryKey: number[]
  title: string
  summary: string
  rewardsPrimaryKey: number[]
  startDate: Date
  endDate: Date
  hasVoice: boolean
}

export type CharacterEpisode = {
  id: number
  backgroundId: number
  characterId: number
  chapterNumber: number
  character: Character
  episode: Episode
}

export type UnitEpisode = {
  id: number
  backgroundId: number
  season: number
  unitPrimaryKey: number
  chapterNumber: number
  unit: Unit
  episode: Episode
}

export type EventEpisode = {
  id: number
  backgroundId: number
  eventPrimaryKey: number
  chapterNumber: number
  event: Event
  episode: Episode
}

export enum Live2DUIChatCategory {
  MenuCommon,
  Training,
  LoginBonus,
  Mission,
}

export type Live2DUIChat = {
  id: number
  categories: Live2DUIChatCategory[]
  characterPrimaryKey: string
  clothId: string
  message: string
  motion: string
  startDate: Date
  endDate: Date
  character: Character
}

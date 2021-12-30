import { Card, Character } from './character'
import { EventEpisode } from './episode'

export enum EventType {
  Raid = 'Raid',
  Slot = 'Slot',
  Poker = 'Poker',
  Medley = 'Medley',
  Bingo = 'Bingo',
}

export type Event = {
  id: number
  name: string
  type: EventType
  startDate: Date
  receptionCloseDate: Date
  rankFixStartDate: Date
  resultAnnouncementDate: Date
  endDate: Date
  stockId: number
  entryBonusStockAmount: number
  stockAmountPerUse: number
  episodeCharacters: number[]
  storyUnlockDate: Date
  showExchangeButton: boolean
  exchangeShopId: number
  isD4FesStory: boolean
  topPrefabPath: string
  bgmpath: string
  episodeCharactersData?: Character[]
  eventEpisode: EventEpisode[]
}

export enum GachaCategory {
  Normal = 'Normal',
  Event = 'Event',
  Birthday = 'Birthday',
  Revival = 'Revival',
  StartDash = 'StartDash',
  Tutorial = 'Tutorial',
}

export enum GachaType {
  Normal,
  StepUp,
  Etc,
}

export type Gacha = {
  id: number
  name: string
  tableRatesPrimaryKey: number[]
  tableIds: number[]
  pickUpCardsPrimaryKey: number[]
  summary: string
  hasSpecificBg: boolean
  startDate: Date
  endDate: Date
  note: string
  detail: string
  live2dBg: string[]
  loginTriggerMinutes: number
  showHomeAnimation: boolean
  hasPickUpDuplicateBonus: boolean
  gachaCardAttribute: number
  ascendingSortId: number
  category: GachaCategory
  bonusStockId: number
  selectBonusMaxValue: number
  selectBonusCardsPrimaryKey: number[]
  selectBonusRewardsPrimaryKey: number[]
  pickUpDuplicateBonusStockAmounts: number[]
  type: GachaType
  stepLoopCount: number
  pickUpCards: Card[]
}

export type HelpMaster = {
  id: number
  categoryPrimaryKey: number
  title: string
  imageUrl: string
  content: string
}

export type UserExpMaster = {
  level: number
  totalExp: number
  recoveryVoltage: number
  maxFriendCount: number
  deckSupportCardNum: number
  adjustEventToken: string
  firebaseEventName: string
}

export type UnitExpMaster = {
  level: number
  totalExp: number
}

export type ParameterLevelMaster = {
  level: number
  needsCharacterRank: number
  effectValue: number
  totalExp: number
}

export type AchievementMaster = {
  id: number
  groupId: number
  sequence: number
  title: string
  description: string
  conditionId: number
  conditionValues: number[]
  rewardsPrimaryKey: number[]
  commandMasterPrimaryKey: number
  eventType: EventType
  isHidden: boolean
  notifyType: AchievementNotifyType
  commandArgument: string
}

export type ADVLiveMaster = {
  id: number
  musicId: number
  chartSection: ChartSectionType
  deckId: number
  clubDeckId: number
  clubFormationId: number
  optionPrimaryKey: number
  isAuto: boolean
  isMVOn: boolean
}

export type AssistOptionPresetMaster = {
  id: number
  name: string
  statusCode: number
}

export type BingoCardMaster = {
  id: number
  minCardNumber: number
  lotNumberNeedPoint: number
  rewardPhaseId: number
  cardImageIDs: number[]
  cardType: BingoCardType
}

export type CardDisplayMaster = {
  id: number
  groupId: number
  cardPrimaryKey: number
  cardType: CardIllustType
  rate: number
}

export type CardMaster = {
  id: number
  rarityPrimaryKey: number
  cardName: string
  attributePrimaryKey: number
  characterPrimaryKey: number
  skillParameterPrimaryKey: number
  skillName: string
  passiveSkillPrimaryKey: number
  maxParameters: number[]
  gachaMessage: string
  clothCardId: number
  debutOrder: number
  cardIllustHeadDistanceY: number[]
  cardIllustCenterDistanceX: number[]
  startDate: Date
  endDate: Date
  gachaCardAttribute: number
  canUseCommonCardStackStock: boolean
}

export type ChampionshipLeagueMaster = {
  id: number
  championshipPrimaryKey: number
  name: string
  colorCode: string
}

export type ChampionshipMaster = {
  id: number
  name: string
  conditionsPrimaryKey: number[]
  summary: string
  leagueSummary: string
  schedule: string
  entryDescription: string
  url: string
  entryURL: string
  startDate: Date
  endDate: Date
  maxPassNumber: number
  canEntry: boolean
  maxRankingNumber: number
  displayStartDate: Date
}

export type CharacterMaster = {
  id: number
  fullName: string
  firstName: string
  firstNameEnglish: string
  unitPrimaryKey: number
  profileAnswers: string[]
  fullNameEnglish: string
  colorCode: string
  idHistories: number[]
}

export type CharacterMissionMaster = {
  id: number
  characterId: number
  title: string
  description: string
  conditionId: number
  conditionValues: number[]
  rewardPoint: number
  commandMasterPrimaryKey: number
  commandArgument: string
  isHidden: boolean
  notifyType: AchievementNotifyType
}

export type CharacterRankRewardMaster = {
  id: number
  characterId: number
  characterRank: number
  category: RewardCategory
  rewardId: number
  amount: number
  startDate: Date
  endDate: Date
}

export type ChargeLimitMaster = {
  age: number
  chageLimitYen: number
}

export type ChartMaster = {
  id: number
  musicPrimaryKey: number
  difficulty: ChartDifficulty
  level: number
  achieveId: number
  trends: number[]
  overrideLevel: string
  designerPrimaryKey: number
}

export type ClubItemDetailMaster = {
  id: number
  level: number
  targetType: ClubItemTargetType
  targetId: number
  effectValue: number
  conditionsPrimaryKey: number[]
  requiredStockId1: number
  requiredAmount1: number
  requiredStockId2: number
  requiredAmount2: number
  requiredStockId3: number
  requiredAmount3: number
  requiredStockId4: number
  requiredAmount4: number
  requiredStockId5: number
  requiredAmount5: number
}

export type ClubItemMaster = {
  id: number
  groupId: number
  name: string
  description: string
  spotPrimaryKey: number
  detailId: number
  categoryPrimaryKey: number
  conditionCardId: number
  startDate: Date
  endDate: Date
  duplicateId: number
  searchWords: string
}

export type ConditionMaster = {
  id: number
  category: ConditionCategory
  value: number[]
}

export type EpisodeMaster = {
  category: EpisodeCategory
  id: number
  conditionsPrimaryKey: number[]
  title: string
  summary: string
  rewardsPrimaryKey: number[]
  startDate: Date
  endDate: Date
  hasVoice: boolean
  advliveID: number
  episodeCharacters: number[]
}

export type EventMaster = {
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
  topPrefabPath: string
  showMissionButton: boolean
  bgmpath: string
  episodeType: EventEpisodeType
  boxGachaId: number
}

export type EventAggregationBaseMaster = {
  id: number
  eventPrimaryKey: number
  aggregationType: EventAggregationType
  pointTypeName: string
  pointTypeIconName: string
  eventPointRewardTemplateId: number
  eventRankingRewardTemplateId: number
}

export type EventPointRewardMaster = {
  id: number
  aggregationPrimaryKey: number
  requiredPoint: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type EventRaveClubTierMaster = {
  id: number
  clubId: number
  type: RAVEClubTierType
  audienceCount: number
  topUserBorder: number
  matchingTypeId: number
}

export type EventRaveMemberTrendMaster = {
  id: number
  category: RaveMemberTrendGroupCategory
  trendValue: number
  effectValue: number
  rate: number
  description: string
}

export type EventRaveRecordingBonusCardMaster = {
  id: number
  bonusId: number
  cardPrimaryKey: number
}

export type EventSpecificBonusMaster = {
  eventPrimaryKey: number
  characterIds: number[]
  attributeId: number
  characterMatchPointBonusValue: number
  attributeMatchPointBonusValue: number
  allMatchPointBonusValue: number
  characterMatchParameterBonusPrimaryKey: number
  attributeMatchParameterBonusPrimaryKey: number
  allMatchParameterBonusPrimaryKey: number
  eventPointParameterBonusId: number
  eventPointParameterBonusRate: number
  eventPointParameterBonusValue: number
  eventPointParameterBaseValue: number
}

export type ExchangeItemMaster = {
  id: number
  exchangePrimaryKey: number
  rewardCategory: RewardCategory
  rewardId: number
  rewardAmount: number
  exchangeCount: number
  resetType: DateSelectCategory
  resetValue: number
  recommend: boolean
  startDate: Date
  endDate: Date
  requiredStockId1: number
  requiredAmount1: number
  requiredStockId2: number
  requiredAmount2: number
  requiredStockId3: number
  requiredAmount3: number
  requiredStockId4: number
  requiredAmount4: number
  prerequisiteItems: number[]
}

export type ExchangeMaster = {
  id: number
  name: string
  isTabVisible: boolean
  isPollingPlace: boolean
  categoryName: string
  order: number
  isSecret: boolean
  secretName: string
  deliveryEffectId: number
  deliveryDate: Date
  showPollingGauge: boolean
  gaugeColorCodes: string[]
}

export type GachaMaster = {
  id: number
  name: string
  tableRatesPrimaryKey: number[]
  tableIds: number[]
  pickUpCardsPrimaryKey: number[]
  gachaTypeName: string
  summaryPrimaryKey: number
  hasSpecificBg: boolean
  startDate: Date
  endDate: Date
  detailPrimaryKey: number
  notePrimaryKey: number
  loginTriggerMinutes: number
  showHomeAnimation: boolean
  hasPickUpDuplicateBonus: boolean
  gachaCardAttribute: number
  ascendingSortId: number
  category: GachaCategory
  selectBonusMaxValue: number
  selectBonusCardsPrimaryKey: number[]
  selectBonusRewardsPrimaryKey: number[]
  pickUpDuplicateBonusStockIds: number[]
  pickUpDuplicateBonusStockAmounts: number[]
  type: GachaType
  stepLoopCount: number
  homeAnimationCardsPrimaryKey: number[]
  otherCardDate: Date
  pickUpLevelMax: boolean
  shareCashBackRate: number
  randomBonusMaxValue: number
  randomBonusStockId: number
}

export type GachaRouletteMaster = {
  id: number
  type: GachaRouletteType
  targetId: number
  effectValue: number
  drawLimit: number
}

export type GrowthBattleEnemyMaster = {
  id: number
  conditionValue: number
  enemyCharacterIds: number[]
  sequence: number
  debuffThreshold: number[]
  debuffValue: number[]
  buffThreshold: number[]
  buffValue: number[]
  enemyName: string
  aggregationPrimaryKey: number
  imagePositionY: number
  enemyType: GrowthEnemyType
  eventPrimaryKey: number
}

export type GrowthMapLayoutConfigMaster = {
  eventId: number
  blockYPositions: number[]
  blockYPositionOrders: number[]
  backgroundChangeBlockIndexes: number[]
  backgroundPrefabNames: string[]
  bgmpath: string
}

export type HonorMaster = {
  id: number
  type: HonorType
  name: string
  description: string
  effectType: number
  conditionCardId: number
  duplicateId: number
}

export type UnitEpisodeMaster = {
  id: number
  backgroundId: number
  season: number
  unitPrimaryKey: number
  chapterNumber: number
}

export type CharacterEpisodeMaster = {
  id: number
  backgroundId: number
  characterId: number
  chapterNumber: number
}

export type EventEpisodeMaster = {
  id: number
  backgroundId: number
  eventPrimaryKey: number
  chapterNumber: number
}

export type Live2DUIChatMaster = {
  id: number
  categories: Live2DUIChatCategory[]
  characterPrimaryKey: number
  clothId: number
  message: string
  motion: string
  startDate: Date
  endDate: Date
}

export type LiveCutinMaster = {
  id: number
  characterId1: number
  text1: string
  motion1: string
  characterId2: number
  text2: string
  motion2: string
  characterId3: number
  text3: string
  motion3: string
  conditionsPrimaryKey: number[]
  startDate: Date
  endDate: Date
}

export type LiveSEPackMaster = {
  id: number
  name: string
  summary: string
  category: LiveSEPackCategory
  startDate: Date
  endDate: Date
}

export type LoginBonusItemMaster = {
  loginBonusPrimaryKey: number
  sequence: number
  rewardsPrimaryKey: number[]
  positions: number[]
}

export type MapBirthdayFlowerMaster = {
  id: number
  characterPrimaryKey: number
  flowerType: MapBirthdayFlowerType
  requiredCardId: number
  anniversaryId: number
  overwriteName: string
  overwriteDescription: string
  bonusCategory: RewardCategory
  bonusRewardId: number
  bonusRewardAmount: number
}

export type MapBirthdayHallMaster = {
  characterPrimaryKey: number
  startDate: Date
  endDate: Date
  towerId: number
}

export type MapMaster = {
  id: number
  name: string
  positionX: number
  positionY: number
  conditionsPrimaryKey: number[]
  bgm: string
  characterScale: number
  startDate: Date
  endDate: Date
  advbackgroundId: number
  forceDefaultMap: boolean
  hideMapId: number
}

export type MapMobMaster = {
  id: number
  mapPrimaryKey: number
  positionX: number
  positionY: number
  motion: number
  direction: number
  skin: number
  movingPattern: MobMovingPattern
  movingDuration: number
  delaySeconds: number
  wayPoint1X: number
  wayPoint1Y: number
  wayPoint2X: number
  wayPoint2Y: number
  wayPoint3X: number
  wayPoint3Y: number
  wayPoint4X: number
  wayPoint4Y: number
  wayPoint5X: number
  wayPoint5Y: number
  characterId: number
  startDate: Date
  endDate: Date
  summerSkin: number
}

export type MapObjectMaster = {
  id: number
  spotPrimaryKey: number
  fileName: string
  randomWeight: number
  startDate: Date
  endDate: Date
  buttonText1: string
  buttonHref1: string
  buttonText2: string
  buttonHref2: string
  buttonText3: string
  buttonHref3: string
}

export type MapObjectSpotMaster = {
  id: number
  mapPrimaryKey: number
  positionX: number
  positionY: number
  objectType: MapObjectType
}

export type MapSpotMaster = {
  mapPrimaryKey: number
  spotId: number
  position1X: number
  position1Y: number
  position2X: number
  position2Y: number
  position3X: number
  position3Y: number
  position4X: number
  position4Y: number
  position5X: number
  position5Y: number
  startDate: Date
  endDate: Date
}

export type MileageMaster = {
  rank: MileageRank
  needMilePoint: number
}

export type MissionDetailMaster = {
  id: number
  panelPrimaryKey: number
  sequence: number
  title: string
  description: string
  conditionId: number
  conditionValues: number[]
  rewardsPrimaryKey: number[]
  commandMasterPrimaryKey: number
  homePriority: number
  notifyType: AchievementNotifyType
  commandArgument: string
}

export type MissionGroupMaster = {
  id: number
  category: MissionCategory
  name: string
  startDate: Date
  endDate: Date
  resetType: DateSelectCategory
  resetValue: number
  subscriptionId: number
}

export type MobBodyVariantMaster = {
  id: number
  skin: number
  spineId: number
}

export type MultiRoomMaster = {
  id: number
  roomType: MultiRoomType
  type: LiveType
  name: string
  description: string
  minimumDeckPower: number
  multiplier: number
  forceAssistOff: boolean
  isRaidRoom: boolean
}

export type MusicMaster = {
  id: number
  name: string
  readName: string
  lyrist: string
  composer: string
  arranger: string
  specialUnitName: string
  category: MusicCategory
  unitPrimaryKey: number
  defaultOrder: number
  musicBpm: number
  openKey: number
  sectionTrend: ChartSectionType
  startDate: Date
  endDate: Date
  hasMovie: boolean
  purchaseBonusesPrimaryKey: number[]
  isHidden: boolean
  excludeChallenge: boolean
  canFairUse: boolean
  unlockDate: Date
}

export type QuestBlockMaster = {
  id: number
  mapPrimaryKey: number
  order: number
  chartId: number
  chartSection: ChartSectionType
  deckId: number
  clubDeckId: number
  conditionType: QuestConditionType
  conditionValue: number
  clubFormationId: number
  deckPower: number
  optionPrimaryKey: number
  assistOptionPrimaryKey: number
  firstRewardsPrimaryKey: number[]
  loopRewardsPrimaryKey: number[]
  name: string
}

export type QuestMapMaster = {
  id: number
  name: string
  startDate: Date
  endDate: Date
  maxPlayableCount: number
  bgm: string
  backgroundPrefabFileName: string
  recoveryStockId: number
  recoveryStockAmount: number
  resetType: DateSelectCategory
  resetValue: number
}

export type RaidBossLocalPointGroupMaster = {
  groupId: number
  name: string
  bossIds: number[]
}

export type RaidBossMaster = {
  aggregationPrimaryKey: number
  roomId: number
  eventId: number
  name: string
  hp: number
  startDate: Date
  endDate: Date
  specificBonusCharacterIds: number[]
  characterMatchParameterBonusPrimaryKey: number
  useRandomUnitImage: boolean
  bonusCardIds: number[]
  cardMatchParameterBonusesPrimaryKey: number[]
  dailyRewardMultipliers: number[]
  overrideImageNumber: number
}

export type RaidSpecialBossMaster = {
  groupId: number
  bossIds: number[]
  eventId: number
  bossLoopType: BossLoopType
}

export type RarityMaster = {
  id: number
  maxLevels: number[]
  maxLevelParameterRates: number[]
  limitBreakBonuses: number[]
  sealAmount: number
  cardStackBonuses: number[]
  rarityName: string
  value: number
  starCount: number
  firstCardIllustType: CardIllustType
}

export type RatingMaster = {
  id: number
  name: string
  startDate: Date
  endDate: Date
  ratings: number[]
  musicNumber: number
  varyByMileage: boolean
}

export type SkillMaster = {
  id: number
  minRecoveryValue: number
  maxRecoveryValue: number
  comboSupportCount: number
  scoreUpRate: number
  minSeconds: number
  maxSeconds: number
  perfectScoreUpRate: number
  groupBonusCharacterIds: number[]
  groupBonusRates: number[]
}

export type SlotBonusTimeMaster = {
  eventPrimaryKey: number
  extendCount: number
  pointRate: number
  ownedBonusCardPointRate: number
  extraTrainingPointRate: number
  extendTime: number
  ownedBonusCardExtendTime: number
  extraTrainingExtendTime: number
  stockPrimaryKey: number
  stockAmount: number
}

export type StampMaster = {
  id: number
  category: StampCategory
  name: string
  description: string
  hasVoice: boolean
  duplicateId: number
  characterIds: number[]
}

export type StockMaster = {
  id: number
  name: string
  category: StockCategory
  viewCategoryPrimaryKey: number
  summary: string
  attributeId: number
  rarity: number
  exp: number
  buffCharacterId: number
  recoveryAmount: number
  consumeAmount: number
  maxAmount: number
  startDate: Date
  endDate: Date
  isAppropriateSales: boolean
}

export type UnitMaster = {
  id: number
  name: string
  canTraining: boolean
  summaries: string[]
  mainColorCode: string
  subColorCode: string
  shortName: string
  initDeckCharacterIds: number[]
}

export type MusicMixMaster = {
  musicPrimaryKey: number
  section: ChartSectionType
  startTime: number
  startTimeBpm: number
  endTime: number
  endTimeBpm: number
  enableLongMixStart: boolean
  enableLongMixEnd: boolean
}

export type ADVLiveClubDeckMaster = {
  id: number
  spotPrimaryKey: number
  itemPrimaryKey: number
  effectIndex: number
}

export type ADVLiveDeckMaster = {
  id: number
  name: string
  order: number
  cardPrimaryKey: number
  illustType: CardIllustType
}

export type BeginnersMissionMaster = {
  detailPrimaryKey: number
  hint: string
  isRecommend: boolean
  isTutorialEnd: boolean
}

export type BoxGachaMaster = {
  id: number
  name: string
  tableIds: number[]
  jackpotTableId: number
  startDate: Date
  endDate: Date
  stockPrimaryKey: number
  stockAmount: number
  cardPrimaryKey: number
}

export type BoxGachaTableMaster = {
  id: number
  tableId: number
  category: RewardCategory
  rewardId: number
  amount: number
  maxCount: number
  ascendingSortId: number
}

export type CampaignButtonMaster = {
  id: number
  command: string
  startDate: Date
  endDate: Date
  text: string
  imageFileName: string
  displayLocation: CampaignButtonDisplayLocation
}

export type CampaignMaster = {
  category: CampaignCategory
  rate: number
  startDate: Date
  endDate: Date
}

export type TitleDisplayMaster = {
  cardDisplayGroupId: number
  startDate: Date
  endDate: Date
  titleBGMCueId: number
  titleVoiceCueName: string
  titleVoiceCueName2: string
}

export type AttributeMaster = {
  id: number
  name: string
}

export type CardExpMaster = {
  level: number
  totalExp: number
}

export type CardStackItemMaster = {
  id: number
  stackCount: number
  attributeId: number
  characterId: number
  rarityId: number
  stockPrimaryKey: number
  amount: number
}

export type PassiveSkillDescriptionMaster = {
  type: PassiveSkillType
  description: string
}

export type PassiveSkillMaster = {
  id: number
  type: PassiveSkillType
  minValue: number
  maxValue: number
  subValue: number
  bonusCharacterId: number
}

export type SkillExpMaster = {
  level: number
  rarityId: number
  totalExp: number
}

export type ChampionshipSetlistMaster = {
  id: number
  leaguePrimaryKey: number
  name: string
  dayLimit: number
  charts: number[]
}

export type ClothMaster = {
  id: number
  clothName: string
  characterPrimaryKey: number
  clothDescription: string
  debutOrder: number
  startDate: Date
  endDate: Date
  sourceCardId: number
}

export type ClubItemCategoryMaster = {
  id: number
  name: string
}

export type ClubItemSpotMaster = {
  id: number
  name: string
  catgory: ClubItemSpotCategory
}

export type ComicMaster = {
  id: number
  title: string
  episodeNumber: string
  startDate: Date
  endDate: Date
}

export type CommonValueMaster = {
  id: CommonValueType
  value: number
}

export type OverrideDefinedGameTextMaster = {
  type: string
  text: string
}

export type DJSimulatorHostCharacterMaster = {
  id: number
  clothIds: number[]
  startDate: Date
  endDate: Date
}

export type DJSimulatorHostClubSetlistMaster = {
  id: number
  unitPrimaryKey: number
  groupIndex: number
  clubItemPrimaryKey: number
}

export type DJSimulatorSetlistMaster = {
  id: number
  name: string
  startDate: Date
  endDate: Date
}

export type DJSimulatorSetlistMusicMaster = {
  setlistPrimaryKey: number
  order: number
  musicPrimaryKey: number
  section: ChartSectionType
}

export type GrowthEpisodeMaster = {
  id: number
  mapBlockCatgory: GrowthBlockCategory
  characterPrimaryKey: number
}

export type LiveResultEpisodeMaster = {
  id: number
  charactersPrimaryKey: number[]
}

export type BingoRewardMaster = {
  id: number
  rewardPhaseId: number
  category: BingoRewardCategory
  maxCount: number
  rewardCategory: RewardCategory
  rewardId: number
  rewardAmount: number
}

export type GrowthActionCardLevelValueMaster = {
  id: number
  rate: number
}

export type GrowthActionCardParameterCountMaster = {
  rarityPrimaryKey: number
  value: number
}

export type GrowthActionCardValueMaster = {
  id: number
  value: number
}

export type GrowthBattleEnemyRewardMaster = {
  id: number
  enemyPrimaryKey: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type GrowthBlockEffectDetailMaster = {
  id: number
  effectType: GrowthBlockEffectType
  effectTargetType: GrowthEffectTargetType
  effectTargetValue: number
  effectTypeValue: number
  effectTypeOperator: GrowthEffectTypeOperator
  effectChance: number
  backUpId: number
}

export type GrowthBlockEffectSetMaster = {
  id: number
  effectDetailsPrimaryKey: number[]
  blockChance: number
}

export type GrowthCharacterBlockMaster = {
  id: number
  sequence: number
  characterIdPrimaryKey: number
  characterEffectType: GrowthBlockEffectType
  effectValues: number[]
  effectTypeOperator: GrowthEffectTypeOperator
  clothId: number
  episodeId: number
}

export type GrowthSpecificBonusMaster = {
  eventPrimaryKey: number
  cardIdsPrimaryKey: number[]
  bonusRate: number
  sameCharacterBonusRate: number
}

export type GrowthUnlockMaster = {
  eventPrimaryKey: number
  lockMemberPrimaryKey: number
  stockId: number
  amount: number
}

export type EventAggregationTermMaster = {
  aggregationId: number
  startDate: Date
  receptionCloseDate: Date
  rankFixStartDate: Date
  resultAnnouncementDate: Date
}

export type EventPointRewardTemplateMaster = {
  id: number
  templateId: number
  requiredPoint: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type EventRankingRewardMaster = {
  id: number
  aggregationPrimaryKey: number
  lowestRanking: number
  highestRanking: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type EventRankingRewardTemplateMaster = {
  id: number
  templateId: number
  lowestRanking: number
  highestRanking: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type ParameterBonusMaster = {
  id: number
  targetId: number
  value: number
}

export type EventMedleySetlistMaster = {
  aggregationPrimaryKey: number
  name: string
  musicIds: number[]
  requiredPoint: number
  startDate: Date
  endDate: Date
  order: number
  specificBonusCharacterIds: number[]
  characterMatchParameterBonusPrimaryKey: number
  bonusCardIds: number[]
  cardMatchParameterBonusesPrimaryKey: number[]
}

export type PokerCharacterHandMaster = {
  id: number
  name: string
  coinAmount: number
  characterIds: number[]
}

export type PokerCoinMultiplierMaster = {
  hand: PokerHandCategory
  multiplier: number
}

export type RaidBossHpBonusDetailMaster = {
  id: number
  bonusId: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type RaidBossHpBonusMaster = {
  id: number
  aggregationId: number
  hp: number
  name: string
}

export type RaidBossLocalPointBonusDetailMaster = {
  id: number
  bonusPrimaryKey: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type RaidBossLocalPointBonusMaster = {
  id: number
  groupPrimaryKey: number
  localPoint: number
  name: string
}

export type EventRaveClubMaster = {
  id: number
  name: string
  rankingRewardGroupId: number
}

export type EventRaveClubRankingRewardMaster = {
  id: number
  aggregationPrimaryKey: number
  groupId: number
  lowestRanking: number
  highestRanking: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type EventRaveMemberTrendGroupMaster = {
  category: RaveMemberTrendGroupCategory
  name: string
  rate: number
}

export type EventRaveMusicTrendGroupMaster = {
  id: number
  name: string
  pickUpTrendCount: number
  hintMusicCount: number
  effectValue: number
  penaltyLine: number
}

export type EventRaveNPCDeckMaster = {
  id: number
  deckId: number
  sequence: number
  cardPrimaryKey: number
  level: number
  limitBreakCount: number
  stackCount: number
  skillLevel: number
}

export type EventRaveNPCMaster = {
  id: number
  clubId: number
  name: string
  audienceCount: number
  deckId: number
  musicTableId: number
  scoreRate: number
}

export type EventRaveRecordingBonusMaster = {
  id: number
  description: string
  effectValue: number
}

export type EventRaveRewardMaster = {
  id: number
  aggregationPrimaryKey: number
  clubId: number
  requiredPoint: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type EventRaveSeasonMaster = {
  seasonId: number
  eventPrimaryKey: number
  isFinalEvent: boolean
}

export type EventRaveShiftMaster = {
  id: number
  name: string
  startDate: Date
  endDate: Date
  clubId: number
  rankingRewardGroupId: number
}

export type EventRaveShiftRankingRewardMaster = {
  id: number
  aggregationPrimaryKey: number
  groupId: number
  lowestRanking: number
  highestRanking: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type EventRaveSplitRankingRewardMaster = {
  id: number
  aggregationPrimaryKey: number
  seasonId: number
  lowestRanking: number
  highestRanking: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type SlotEffectMaster = {
  id: number
  effectId: number
  phase: SlotEffectPhase
  normalRate: number
  chanceTimeRate: number
  toChanceRate: number
}

export type SlotRewardMaster = {
  id: number
  stockPrimaryKey: number
  amount: number
  normalRate: number
  chanceTimeRate: number
  effectId: number
  cardId: number
  stampId: number
}

export type SlotSpecificBonusMaster = {
  eventPrimaryKey: number
  bonusCardIds: number[]
}

export type AuditionGachaResetMaster = {
  gachaDrawPrimaryKey: number
  stockPrimaryKey: number
  stockAmount: number
}

export type GachaBonusMaster = {
  gachaId: number
  isMain: boolean
  maxValue: number
  tableRatePrimaryKey: number
  tableIds: number[]
  text: string
}

export type GachaDrawMaster = {
  id: number
  gachaPrimaryKey: number
  drawAmounts: number[]
  stockPrimaryKey: number
  stockAmount: number
  drawLimit: number
  isResetLimitEveryday: boolean
  rouletteTargetsPrimaryKey: number[]
  rouletteRates: number[]
  bonusStockIds: number[]
  bonusStockAmounts: number[]
  shareCashBackStockId: number
  shareCashBackPerStockCount: number
}

export type GachaExplanationWordMaster = {
  id: number
  text: string
}

export type GachaNotesWordMaster = {
  id: number
  text: string
}

export type GachaSummaryWordMaster = {
  id: number
  text: string
}

export type GachaTableMaster = {
  id: number
  tableId: number
  cardId: number
  rate: number
}

export type GachaTableRateMaster = {
  id: number
  rates: number[]
  rarityIds: number[]
  tabName: string
  description: string
}

export type GradeMusicListMaster = {
  id: number
  seasonPrimaryKey: number
  grade: number
  name: string
  maxHP: number
  evaluationRate: number[]
  charts: number[]
  isHidden: number[]
  missionPrimaryKey: number
  openConditionMissionDetailsPrimaryKey: number[]
}

export type GradeSeasonMaster = {
  id: number
  name: string
  startDate: Date
  endDate: Date
}

export type HelpCategoryMaster = {
  id: number
  name: string
}

export type ChartAchieveMaster = {
  id: number
  type: ChartAchieveType
  value: number
  rewardStockPrimaryKey: number
  rewardAmount: number
}

export type LiveSEMaster = {
  id: number
  liveSEPackMasterPrimaryKey: number
  category: LiveSECategory
  name: string
  isPreset: boolean
}

export type LiveSEPackPurchaseMaster = {
  id: number
  startDate: Date
  endDate: Date
  requiredStockId: number
  requiredAmount: number
}

export type EventLoginBonusItemMaster = {
  loginBonusPrimaryKey: number
  eventId: number
  sequence: number
  rewardsPrimaryKey: number[]
}

export type LoginBonusMaster = {
  id: number
  type: LoginBonusType
  title: string
  order: number
  loop: boolean
  startDate: Date
  endDate: Date
  positionId: number
  subscriptionId: number
  backgroundImage: string
  foregroundImage: string
  datePositions: number[]
  limitDays: number
  comebackDays: number
}

export type LoginBonusPositionTemplateMaster = {
  id: number
  sequence: number
  positions: number[]
}

export type MapEventMaster = {
  id: number
  mapPrimaryKey: number
  charactersPrimaryKey: number[]
  motions: number[]
  directions: number[]
  skins: number[]
  eventType: MapEventType
  summerSkins: number[]
}

export type SummerClothMaster = {
  id: number
  characterIds: number[]
  startDate: Date
  endDate: Date
}

export type CommandMaster = {
  id: number
  title: string
  command: string
}

export type MissionPanelMaster = {
  id: number
  groupPrimaryKey: number
  bannerGroup: number
  step: number
  name: string
  allCompleteRewardsPrimaryKey: number[]
}

export type ChartDesignerMaster = {
  id: number
  name: string
}

export type ChartLessonMaster = {
  chartId: number
  measureIndex: number
  text: string
  imagePaths: string[]
}

export type HiddenMusicMixDetailMaster = {
  mixPrimaryKey: number
  order: number
  startTime: number
  startTimeBpm: number
  endTime: number
  endTimeBpm: number
  enableLongMixStart: boolean
  enableLongMixEnd: boolean
}

export type HiddenMusicMixMaster = {
  id: number
  triggerMusicIds: number[]
}

export type TutorialMusicMaster = {
  id: number
  order: number
  startDate: Date
  endDate: Date
}

export type ChartNoteCountMaster = {
  chartId: number
  section: ChartSectionType
  normalCount: number
  simpleCount: number
}

export type HiddenMusicMixNoteCountMaster = {
  id: number
  order: number
  difficulty: ChartDifficulty
  normalCount: number
  simpleCount: number
}

export type MusicRecommendMaster = {
  id: number
  description: string
  isClientOnly: boolean
  isChooseAbsolutely: boolean
  isInsurance: boolean
}

export type NavigationCardNotifyMaster = {
  id: number
  cardPrimaryKey: number
  categories: PushNotificationType
  text: string
  startDate: Date
  endDate: Date
}

export type NavigationCardVoiceMaster = {
  id: number
  cardPrimaryKey: number
  categories: NavigationCardVoiceCategory
  value1: number
  value2: number
  startDate: Date
  endDate: Date
}

export type OptionPresetMaster = {
  id: number
  name: string
  description: string
  data: string
  isSelectable: boolean
  dataDescription: string
}

export type CardAffectionRewardMaster = {
  id: number
  attributeId: number
  characterId: number
  rarityId: number
  affection: number
  isNoEpisodeOnly: boolean
  category: RewardCategory
  rewardId: number
  amount: number
}

export type RewardMaster = {
  id: number
  category: RewardCategory
  rewardId: number
  amount: number
}

export type TowerMaster = {
  id: number
  name: string
  category: string
  availableCharacterIds: number[]
  availableAttributeIds: number[]
  bonusCharacterIds: number[]
  characterMatchParameterBonusPrimaryKey: number
  bonusAttributeIds: number[]
  attributeMatchParameterBonusPrimaryKey: number
  bonusCardIds: number[]
  cardMatchParameterBonusesPrimaryKey: number[]
  startDate: Date
  endDate: Date
}

export type StaminaMaster = {
  category: StaminaCategory
  name: string
  maxCount: number
  maxAllowCount: number
  recoverySeconds: number
  startDate: Date
  endDate: Date
  eventType: EventType
}

export type TowerStageMaster = {
  towerPrimaryKey: number
  order: number
  name: string
  musicsPrimaryKey: number[]
  targetScore: number
  rewardsPrimaryKey: number[]
}

export type QuestClubDeckMaster = {
  id: number
  spotPrimaryKey: number
  itemPrimaryKey: number
  effectIndex: number
}

export type QuestDeckMaster = {
  id: number
  order: number
  cardPrimaryKey: number
  illustType: CardIllustType
}

export type RatingMusicMaster = {
  id: number
  ratingPrimaryKey: number
  musicPrimaryKey: number
}

export type RatingRankMaster = {
  id: number
  name: string
}

export type RatingRewardMaster = {
  id: number
  ratingPrimaryKey: number
  rankPrimaryKey: number
  mileageRank: MileageRank
  requireRating: number
  rewardPrimaryKey: number
}

export type SceneBGMEffectMaster = {
  id: number
  sceneName: string
  volume: number
  bandpassFilterValue: number[]
}

export type LimitBreakItemMaster = {
  id: number
  rarityPrimaryKey: number
  attributePrimaryKey: number
  limitBreakCount: number
  stockPrimaryKey: number
  amount: number
}

export type NextConsumeStockMaster = {
  stockPrimaryKey: number
  nextStocksPrimaryKey: number[]
}

export type RandomStockMaster = {
  id: number
  originalStockId: number
  stockId: number
  amount: number
  rate: number
}

export type StockViewCategoryMaster = {
  id: number
  name: string
}

export type VoltageRecoverMaster = {
  id: number
  category: StaminaCategory
  minRecoveredCount: number
  diamondAmount: number
  voltageRecoverAmount: number
}

export type SceneGroupTipsMaster = {
  id: number
  sceneName: string
  groupIds: number[]
}

export type TrumpMaster = {
  suit: TrumpSuit
  id: number
  imageId: number
  pose: number
}

export enum CampaignButtonDisplayLocation {
  Home,
  Club,
  Story,
}

export enum CampaignCategory {
  Mileage,
  RaidUserExp,
  RaidUnitExp,
}

export enum CardIllustType {
  Normal,
  LimitBreak,
  MaxLimitBreak,
}

export enum PassiveSkillType {
  None,
  FeverBonus,
  FeverSupport,
  ScoreUpWithDamage,
  AutoScoreUp,
  SupportableScoreUp,
  SupportableSkillLonger,
}

export enum ClubItemSpotCategory {
  Club,
  DJ,
  Stage,
  Ceiling,
}

export enum ClubItemTargetType {
  None,
  Unit,
  Attribute,
  Parameter,
  Character,
  All,
}

export enum CommonValueType {
  LiveSECount,
  LiveNoteDesignCount,
  LiveTapEffectCount,
  LiveSliderLineCount,
  LiveSliderArrowCount,
  LiveContinueDiamondAmount,
  LiveBoostMultiplier,
  GameLogicHours,
  LikeEachTakeCount,
  DJBoothGuestBookLatestListCount,
  FriendRequestMaxCount,
  PresentReceivedDayCount,
  FavoriteStampMaxCount,
  HonorMaxCount,
  DJBoothSetlistMaxCount,
  DJBoothGuestBookSetlistCount,
  DJBoothGuestBookHighScoreListCount,
  DJBoothSetlistLivePassMaxCount,
  DJBoothSetlistActiveLivePassMaxCount,
  CharacterMaxCountPerUnit,
  DeckEditGaugeMaxValue,
  AvailableLatestNormalUnitId,
  HighScoreRatingDivisionCoefficient,
  NicknameMaxLength,
  CommentMaxLength,
  CardDeckNameMaxLength,
  ClubDeckNameMaxLength,
  DJBoothSetlistTitleMaxLength,
  MusicFavoriteDeckNameMaxLength,
  DJBoothCommentMaxLength,
  LiveSEPresetNameMaxLength,
  EpisodeCommentMaxLength,
  BirthdayFlowerCommentMaxLength,
  EpisodeCommentShareMaxLength,
  VoltageMaxAllowCount,
  ConvertedRewardHelpId,
  PrivateRoomCommentMaxLength,
  RaidEventHpMode,
  RaidEventSpecialBossHpMode,
  ClubOrderCharaShadow,
  ClubOrderDJChara,
  ClubOrderDJBooth,
  ClubOrderOtherChara,
  ClubOrderFrontChara,
  MusicTagMaxCount,
  MusicTagNameMaxLenght,
  MusicTagNeedLevel,
  MusicRecommendCount,
  EventSlotExtendableBonusTimeSeconds,
  EventGrowthActionCardMaxMoveCount,
  EventGrowthMaxHandCount,
  EventGrowthExactDeckCount,
  EventGrowthExactGrowthMemberCount,
  EventGrowthActionCardMaxLevel,
  EventGrowthActionCardMaxSameCharacter,
  EventGrowthMaximumRedrawCount,
  EventGrowthConsumeVoltageForRedraw,
  EventGrowthConsumeVoltageForPlayStart,
  EpisodeCommentTakeCount,
  EpisodeCommentRewriteHours,
  EpisodeCommentPenaltyHours,
  EpisodeCommentRatingLimit,
  EpisodeCommentPenaltyCount,
  EventRaveFlyerBonusRate,
  EventRaveFlyerBonusRecoveryMaxCount,
}

export enum PushNotificationType {
  Midnight,
  Liked,
  GuestBookPost,
  FriendRequest,
  MusicPresent,
  VoltageMax,
  Retention24h,
  NavigationCard,
}

export enum ConditionCategory {
  None,
  UserLevel,
  UnitLevel,
  ClubItem,
  Story,
  EventPoint,
  CharacterRank,
  Unreleased,
}

export enum EpisodeCategory {
  Unit,
  Event,
  Card,
  LiveResult,
  Map,
  Character,
  Growth,
  Tutorial,
}

export enum BingoCardType {
  Normal,
  Special,
}

export enum BingoRewardCategory {
  Bingo,
  Hit,
  Complete,
}

export enum GrowthBlockCategory {
  None,
  Red,
  Green,
  Character,
  White,
  Condition,
  Reward,
  VS,
}

export enum GrowthBlockEffectType {
  None,
  TrainingBonus,
  HeartExp,
  TechniqueExp,
  PhysicalExp,
  AllExp,
  LevelChange,
  BlockChange,
  CharacterEffect,
  TreasureEffect,
  LiveBattle,
  OtherEffectSet,
}

export enum GrowthEffectTargetType {
  None,
  Pick,
  All,
  Random,
}

export enum GrowthEffectTypeOperator {
  None,
  Rate,
  Step,
}

export enum GrowthEnemyType {
  Normal,
  Collabo,
}

export enum EventAggregationType {
  MainAddPoint,
  Highscore,
  EngineSpecific,
  DailyAddPoint,
  CommonAddPoint,
  RaveShiftPoint,
  None,
}

export enum EventEpisodeType {
  Normal,
  D4Fes1,
  D4Fes2,
  D4Fes3,
  D4Fes3Nova,
  D4Fes3Origin,
  D4Fes3Finale,
}

export enum EventType {
  None,
  Bingo,
  Medley,
  Poker,
  Raid,
  Slot,
  Growth,
  Rave,
}

export enum PokerHandCategory {
  RoyalStraightFlush,
  StraightFlush,
  FourOfAKind,
  FullHouse,
  Flush,
  Straight,
  ThreeOfAKind,
  TwoPair,
  OnePair,
  HighCard,
}

export enum BossLoopType {
  Loop,
  FinalLoop,
}

export enum RAVEClubTierType {
  Rookie,
  Newcomer,
  Guest,
  Resident,
  Challenger,
  Dominator,
}

export enum RaveMemberTrendGroupCategory {
  Unit,
  Character,
  Attribute,
  Parameter,
  Rarity,
  Skill,
  PassiveSkill,
  StackCount,
}

export enum SlotEffectPhase {
  None,
  SD,
  Reach,
  Stamp,
  UnitLogo,
  FlavorText,
  Shutdown,
  Card,
}

export enum DateSelectCategory {
  None,
  Daily,
  Weekly,
  Monthly,
}

export enum GachaCategory {
  Normal,
  Tutorial,
  Event,
  Birthday,
  StartDash,
  Revival,
  Special,
}

export enum GachaRouletteType {
  PickUpUp,
  RarityUp,
  StockPresent,
}

export enum GachaType {
  Normal,
  StepUp,
  Audition,
  Guaranteed,
}

export enum HonorType {
  Common,
  Mission,
  DigRank,
  Event,
  D4Pass,
  Character,
}

export enum Live2DUIChatCategory {
  MenuCommon,
  LoginBonus,
  Mission,
  BoxGacha,
  BoxGachaDraw,
  BoxGachaJackpot,
  Training,
  BoxGachaReset,
}

export enum ChartAchieveType {
  Score,
  Combo,
  ClearCount,
}

export enum LiveType {
  Single,
  Medley,
  SingleBattle,
}

export enum MultiRoomType {
  Free,
  Beginner,
  Veteran,
  Master,
}

export enum LiveSECategory {
  None,
  Tap1,
  Tap2,
  SliderFlick,
  Scratch,
  TapEmpty,
  ScratchEmpty,
  LongLoop,
}

export enum LiveSEPackCategory {
  SoundEffect,
  CharacterVoice,
  Collabo,
}

export enum LoginBonusType {
  Common,
  Campaign,
  Subscription,
  VipBronze,
  VipSilver,
  VipGold,
  VipPlatinum,
  EventBingo,
  EventMedley,
  EventPoker,
  EventRaid,
  EventSlot,
  EventGrowth,
  EventRave,
}

export enum MapBirthdayFlowerType {
  Public,
  Private,
}

export enum MapEventType {
  Normal,
  Special,
  Birthday,
}

export enum MapObjectType {
  Prefab,
  Image,
  Movie,
}

export enum MobMovingPattern {
  Fixed,
  OneWay,
  Loop,
}

export enum AchievementNotifyType {
  Default,
  PokerHand,
  BingoCard,
  Slot,
}

export enum MissionCategory {
  Achievement,
  Tutorial,
  Chart,
  TimeLimited,
  Daily,
  Weekly,
  Event,
}

export enum ChartDifficulty {
  None,
  Easy,
  Normal,
  Hard,
  Expert,
}

export enum ChartSectionType {
  Full,
  Begin,
  Middle,
  End,
  DJSimulator,
}

export enum MusicCategory {
  None,
  Original,
  Cover,
  Game,
  Instrumental,
  Collabo,
}

export enum NavigationCardVoiceCategory {
  Talk,
  Time,
  Weekday,
  Idle,
}

export enum MileageRank {
  Normal,
  Bronze,
  Silver,
  Gold,
  Platinum,
}

export enum QuestConditionType {
  Hp,
  MaxCombo,
  GreatCount,
  GoodCount,
  BadCount,
  MissCount,
  Score,
}

export enum StaminaCategory {
  Voltage,
  RavePoint,
}

export enum StampCategory {
  Common,
  Rare,
  Collabo,
}

export enum RewardCategory {
  Stock,
  Card,
  ClubItem,
  Music,
  Stamp,
  Honor,
  Episode,
  Movie,
  DuplicateCard,
  EventPoint,
  LiveSEPack,
  Cloth,
  CardParameterOverwriter,
  BirthdayFlower,
  DigRankLevel,
}

export enum StockCategory {
  Diamond,
  Fragment,
  Exp,
  SkillExp,
  LimitBreak,
  VoltageRecovery,
  Boost,
  MusicShop,
  Event,
  GachaTicket,
  Random,
  ParameterLevelUp,
  CardStack,
  RavePointRecovery,
  RaveBoost,
  Other,
}

export enum TrumpSuit {
  Club,
  Diamond,
  Heart,
  Spade,
}


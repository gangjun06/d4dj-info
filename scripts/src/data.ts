import { ModelSetting } from './types/index.js'

export const prismaBase = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
}
`

export const prismaExtra = `
enum Region {
  en
  jp
}
`

export const modelSetting: { [key: string]: ModelSetting } = {
  AchievementMaster: {
    fields: [
      {
        key: 'rewards',
        ref: 'RewardMaster',
        refField: 'achievements',
        type: 'ManyToMany',
      },
      {
        key: 'commandMaster',
        ref: 'CommandMaster',
        refField: 'achievements',
        type: 'OneToMany',
      },
    ],
  },
  AuditionGachaReset: {
    fields: [
      {
        key: 'gachaDraw',
        ref: 'GachaDrawMaster',
        refField: 'auditionGachaResets',
        type: 'OneToMany',
      },
      {
        key: 'stock',
        ref: 'StockMaster',
        refField: 'auditionGachaResets',
        type: 'OneToMany',
      },
    ],
  },
  BoxGachaMaster: {
    fields: [
      {
        key: 'stock',
        ref: 'StockMaster',
        refField: 'boxGachas',
        type: 'OneToMany',
      },
      {
        key: 'card',
        ref: 'CardMaster',
        refField: 'boxGachas',
        type: 'OneToMany',
      },
    ],
  },
  CardDisplayMaster: {
    fields: [
      {
        key: 'card',
        ref: 'CardMaster',
        refField: 'cardDisplays',
        type: 'OneToMany',
      },
    ],
  },
  CardExpMaster: {
    id: ['level'],
  },
  CardMaster: {
    fields: [
      {
        key: 'rarity',
        ref: 'RarityMaster',
        refField: 'cards',
        type: 'OneToMany',
      },
      {
        key: 'attribute',
        ref: 'AttributeMaster',
        refField: 'cards',
        type: 'OneToMany',
      },
      {
        key: 'character',
        ref: 'CharacterMaster',
        refField: 'cards',
        type: 'OneToMany',
      },
      {
        key: 'skill',
        ref: 'SkillMaster',
        refField: 'cards',
        type: 'OneToMany',
      },
      {
        key: 'passiveSkill',
        ref: 'PassiveSkillMaster',
        refField: 'cards',
        type: 'OneToMany',
      },
    ],
  },
  CardStackItemMaster: {
    fields: [
      {
        key: 'stock',
        ref: 'StockMaster',
        refField: 'cardStackItems',
        type: 'OneToMany',
      },
    ],
  },
  ChampionshipLeagueMaster: {
    fields: [
      {
        key: 'championship',
        ref: 'ChampionshipMaster',
        refField: 'leagues',
        type: 'OneToMany',
      },
    ],
  },
  ChampionshipSetlistMaster: {
    fields: [
      {
        key: 'league',
        ref: 'ChampionshipLeagueMaster',
        refField: 'setlists',
        type: 'OneToMany',
      },
    ],
  },
  CharacterMaster: {
    fields: [
      {
        key: 'unit',
        ref: 'UnitMaster',
        refField: 'characters',
        type: 'OneToMany',
      },
    ],
  },
  ChartAchieveMaster: {
    fields: [
      {
        key: 'rewardStock',
        ref: 'StockMaster',
        refField: 'chartAchieveRewards',
        type: 'OneToMany',
      },
    ],
    id: ['id', 'type', 'value'],
  },
  ChartLessonMaster: {
    id: ['chartId', 'measureIndex'],
  },
  ChartMaster: {
    fields: [
      {
        key: 'music',
        ref: 'MusicMaster',
        refField: 'charts',
        type: 'OneToMany',
      },
      {
        key: 'designer',
        ref: 'ChartDesignerMaster',
        refField: 'charts',
        type: 'OneToMany',
      },
    ],
  },
  ChartNoteCountMaster: {
    id: ['chartId', 'section'],
  },
  ClubitemDetailMaster: {
    id: ['id', 'level'],
  },
  ClubItemMaster: {
    fields: [
      {
        key: 'spot',
        ref: 'ClubItemSpotMaster',
        refField: 'items',
        type: 'OneToMany',
      },
      {
        key: 'category',
        ref: 'ClubItemCategoryMaster',
        refField: 'items',
        type: 'OneToMany',
      },
    ],
  },
  DJSimulatorSetlistMusicMaster: {
    fields: [
      {
        key: 'setlist',
        ref: 'DJSimulatorSetlistMaster',
        refField: 'musics',
        type: 'OneToMany',
      },
      {
        key: 'music',
        ref: 'MusicMaster',
        refField: 'djSimulatorSetlistMusics',
        type: 'OneToMany',
      },
    ],
    id: ['setlistId', 'order'],
  },
  EpisodeMaster: {
    fields: [
      {
        key: 'conditions',
        ref: 'ConditionMaster',
        refField: 'episodes',
        type: 'ManyToMany',
      },
      {
        key: 'rewards',
        ref: 'RewardMaster',
        refField: 'episodes',
        type: 'ManyToMany',
      },
    ],
  },
  EventAggregationBaseMaster: {
    fields: [
      {
        key: 'event',
        ref: 'EventMaster',
        refField: 'aggregations',
        type: 'OneToMany',
      },
    ],
  },
  EventEpisodeMaster: {
    fields: [
      {
        key: 'event',
        ref: 'EventMaster',
        refField: 'episodes',
        type: 'OneToMany',
      },
    ], // TODO: CustomField
  },
  EventLoginBonusItemMaster: {
    fields: [
      {
        key: 'loginBonus',
        ref: 'LoginBonusMaster',
        refField: 'eventLoginBonusItems',
        type: 'OneToMany',
      },
      {
        key: 'rewards',
        ref: 'RewardMaster',
        refField: 'eventLoginBonusItems',
        type: 'ManyToMany',
      },
    ],
    id: ['loginBonusId', 'eventId', 'sequence'],
  },
  EventMedleySetlistMaster: {
    fields: [
      {
        key: 'aggregation',
        ref: 'EventAggregationBaseMaster',
        refField: 'eventMedleySetlists',
        type: 'OneToMany',
      },
      {
        key: 'characterMatchParameterBonus',
        ref: 'ParameterBonusMaster',
        refField: 'eventMedleySetlists',
        type: 'OneToMany',
      },
    ],
  },
  EventPointRewardMaster: {
    fields: [
      {
        key: 'Aggregation',
        ref: 'EventAggregationBaseMaster',
        refField: 'eventPointRewards',
        type: 'OneToMany',
      },
    ],
  },
  EventRankingRewardMaster: {
    fields: [
      {
        key: 'Aggregation',
        ref: 'EventAggregationBaseMaster',
        refField: 'eventRankingRewards',
        type: 'OneToMany',
      },
    ],
  },
  EventSpecificBonusMaster: {
    fields: [
      {
        key: 'event',
        ref: 'EventMaster',
        refField: 'eventSpecificBonuses',
        type: 'OneToMany',
      },
      {
        key: [
          'characterMatchParameterBonus',
          'AttributeMatchParameterBonus',
          'AllMatchParameterBonus',
        ],
        ref: 'ParameterBonusMaster',
        refField: 'eventSpecificBonuses',
        type: 'OneToMany',
      },
    ],
    id: ['eventId'],
  },
  ExchangeItemMaster: {
    fields: [
      {
        key: 'exchange',
        ref: 'ExchangeMaster',
        refField: 'items',
        type: 'OneToMany',
      },
    ],
  },
  GachaBonusMaster: {
    fields: [
      {
        key: 'tableRate',
        ref: 'GachaTableRateMaster',
        refField: 'gachaBonuses',
        type: 'OneToMany',
      },
    ],
    id: ['gachaId', 'isMain'],
  },
  GachaDrawMaster: {
    fields: [
      {
        key: 'gacha',
        ref: 'GachaMaster',
        refField: 'draws',
        type: 'OneToMany',
      },
      {
        key: 'stock',
        ref: 'StockMaster',
        refField: 'gachaDraws',
        type: 'OneToMany',
      },
      {
        key: 'rouletteTargets',
        ref: 'GachaRouletteMaster',
        refField: 'gachaDraws',
        type: 'ManyToMany',
      },
    ],
  },
  GachaMaster: {
    fields: [
      {
        key: 'tableRates',
        ref: 'GachaTableRateMaster',
        refField: 'gacha',
        type: 'ManyToMany',
      },
      {
        key: ['pickUpCards', 'selectBonusCards', 'homeAnimationCards'],
        ref: 'CardMaster',
        refField: 'gacha$',
        type: 'ManyToMany',
      },
      {
        key: 'summary',
        ref: 'GachaSummaryWordMaster',
        refField: 'gacha',
        type: 'OneToMany',
      },
      {
        key: 'detail',
        ref: 'GachaExplanationWordMaster',
        refField: 'gacha',
        type: 'OneToMany',
      },
      {
        key: 'note',
        ref: 'GachaNotesWordMaster',
        refField: 'gacha',
        type: 'OneToMany',
      },
      {
        key: 'selectBonusRewards',
        ref: 'RewardMaster',
        refField: 'gacha',
        type: 'ManyToMany',
      },
    ],
  },
  HelpMaster: {
    fields: [
      {
        key: 'category',
        ref: 'HelpCategoryMaster',
        refField: 'helps',
        type: 'OneToMany',
      },
    ],
  },
  HiddenMusicMixDetailMaster: {
    fields: [
      {
        key: 'mix',
        ref: 'HiddenMusicMixMaster',
        refField: 'details',
        type: 'OneToMany',
      },
    ],
    id: ['mixId', 'order'],
  },
  HiddenMusicMixNoteCountMaster: {
    id: ['id', 'order', 'difficulty'],
  },
  LimitBreakItemMaster: {
    fields: [
      {
        key: 'rarity',
        ref: 'RarityMaster',
        refField: 'limitBreakItems',
        type: 'OneToMany',
      },
      {
        key: 'attribute',
        ref: 'AttributeMaster',
        refField: 'limitBreakItems',
        type: 'OneToMany',
      },
      {
        key: 'stock',
        ref: 'StockMaster',
        refField: 'limitBreakItems',
        type: 'OneToMany',
      },
    ],
  },
  Live2DUIChatMaster: {
    fields: [
      {
        key: 'character',
        ref: 'CharacterMaster',
        refField: 'live2DUIChats',
        type: 'OneToMany',
      },
    ],
  },
  LiveResultEpisodeMaster: {
    fields: [
      {
        key: 'characters',
        ref: 'CharacterMaster',
        refField: 'liveResultEpisodes',
        type: 'ManyToMany',
      },
    ],
  },
  LiveSEMaster: {
    fields: [
      {
        key: 'liveSEMaster',
        ref: 'LiveSEPackMaster',
        refField: 'liveSEs',
        type: 'OneToMany',
      },
    ],
  },
  LoginBonusItemMaster: {
    fields: [
      {
        key: 'loginBonus',
        ref: 'LoginBonusMaster',
        refField: 'items',
        type: 'OneToMany',
      },
    ],
    id: ['loginBonusId', 'sequence'],
  },
  LoginBonusPositionTemplateMaster: {
    id: ['id', 'sequence'],
  },
  MapEventMaster: {
    fields: [
      {
        key: 'map',
        ref: 'MapMaster',
        refField: 'mapEvents',
        type: 'OneToMany',
      },
      {
        key: 'characters',
        ref: 'CharacterMaster',
        refField: 'mapEvents',
        type: 'ManyToMany',
      },
    ],
  },
  MapMobMaster: {
    fields: [
      {
        key: 'map',
        ref: 'MapMaster',
        refField: 'mapMobs',
        type: 'OneToMany',
      },
    ],
  },
  MapObjectMaster: {
    fields: [
      {
        key: 'spot',
        ref: 'MapObjectSpotMaster',
        refField: 'mapObjects',
        type: 'OneToMany',
      },
    ],
  },
  MapObjectSpotMaster: {
    fields: [
      {
        key: 'map',
        ref: 'MapMaster',
        refField: 'mapObjectSpots',
        type: 'OneToMany',
      },
    ],
  },
  MapSpotMaster: {
    id: ['mapId', 'spotId'],
  },
  MileageMaster: {
    id: ['rank'],
  },
  MissionDetailMaster: {
    fields: [
      {
        key: 'panel',
        ref: 'MissionPanelMaster',
        refField: 'details',
        type: 'OneToMany',
      },
      {
        key: 'rewards',
        ref: 'RewardMaster',
        refField: 'missionDetails',
        type: 'ManyToMany',
      },
      {
        key: 'commandMaster',
        ref: 'CommandMaster',
        refField: 'missionDetails',
        type: 'OneToMany',
      },
    ],
  },
  MissionPanelMaster: {
    fields: [
      {
        key: 'group',
        ref: 'MissionGroupMaster',
        refField: 'panels',
        type: 'OneToMany',
      },
      {
        key: 'allCompleteRewards',
        ref: 'RewardMaster',
        refField: 'missionPanels',
        type: 'ManyToMany',
      },
    ],
  },
  MusicMaster: {
    fields: [
      {
        key: 'unit',
        ref: 'UnitMaster',
        refField: 'musics',
        type: 'OneToMany',
      },
      {
        key: 'purchaseBonuses',
        ref: 'RewardMaster',
        refField: 'musics',
        type: 'ManyToMany',
      },
    ],
  },
  MusicMixMaster: {
    fields: [
      {
        key: 'music',
        ref: 'MusicMaster',
        refField: 'musicMixes',
        type: 'OneToMany',
      },
    ],
    id: ['musicId', 'secton'],
  },
  ParameterLevelMaster: {
    id: ['level'],
  },
  PassiveSkillExpMaster: {
    id: ['level', 'rarityId'],
  },
  PassiveSkillMaster: {
    id: ['level'],
  },
  QuestBlockMaster: {
    fields: [
      {
        key: 'option',
        ref: 'OptionPresetMaster',
        refField: 'questBlocks',
        type: 'ManyToOne',
      },
      {
        key: 'assistOption',
        ref: 'AssistOptionPresetMaster',
        refField: 'questBlocks',
        type: 'ManyToOne',
      },
      {
        key: ['firstRewards', 'loopRewards'],
        ref: 'RewardMaster',
        refField: 'quest$',
        type: 'ManyToMany',
      },
      {
        key: 'map',
        ref: 'MapMaster',
        refField: 'questBlocks',
        type: 'OneToMany',
      },
      {
        key: 'chart',
        ref: 'ChartMaster',
        refField: 'questBlocks',
        type: 'OneToMany',
      },
    ],
  },
  QuestClubDeckMaster: {
    fields: [
      {
        key: 'spot',
        ref: 'ClubItemSpotMaster',
        refField: 'questClubDecks',
        type: 'OneToMany',
      },
      {
        key: 'item',
        ref: 'ClubItemMaster',
        refField: 'questClubDecks',
        type: 'OneToMany',
      },
    ],
    id: ['id', 'spotId'],
  },
  QuestDeckMaster: {
    fields: [
      {
        key: 'card',
        ref: 'CardMaster',
        refField: 'questDecks',
        type: 'OneToMany',
      },
    ],
    id: ['id', 'order'],
  },
  SkillExpMaster: {
    id: ['level', 'rarityId'],
  },
  StockMaster: {
    fields: [
      {
        key: 'viewCategory',
        ref: 'StockViewCategoryMaster',
        refField: 'stocks',
        type: 'OneToMany',
      },
    ],
  },
  TowerMaster: {
    fields: [],
  },
  TowerStageMaster: {
    fields: [
      {
        key: 'tower',
        ref: 'TowerMaster',
        refField: 'towerStages',
        type: 'OneToMany',
      },
      {
        key: 'musics',
        ref: 'MusicMaster',
        refField: 'towerStages',
        type: 'ManyToMany',
      },
      {
        key: 'rewards',
        ref: 'RewardMaster',
        refField: 'towerStages',
        type: 'ManyToMany',
      },
    ],
    id: ['towerId', 'order'],
  },
  TrumpMaster: {
    id: ['suit', 'id'],
  },
  UnitEpisodeMaster: {
    fields: [
      {
        key: 'unit',
        ref: 'UnitMaster',
        refField: 'episodes',
        type: 'OneToMany',
      },
    ],
  },
  UnitExpMaster: {
    id: ['level'],
  },
  UserExpMaster: {
    id: ['level'],
  },
}

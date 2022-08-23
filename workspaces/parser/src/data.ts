import { ModelSetting, RelationType } from './types/index.js'
const { OneToMany, ManyToOne, ManyToMany } = RelationType

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
  AuditionGachaResetMaster: {
    id: ['__GachaDrawPrimaryKey__'],
    fields: {
      gachaDraw: {
        ref: 'GachaDrawMaster',
        refField: 'auditionGachaReset',
        type: OneToMany,
      },
      stock: {
        ref: 'StockMaster',
        refField: 'auditionGachaReset',
        type: OneToMany,
      },
    },
  },
  AchievementMaster: {
    fields: {
      commandMaster: {
        ref: 'CommandMaster',
        refField: 'achievements',
        type: OneToMany,
      },
    },
  },
  AuditionGachaReset: {
    fields: {
      gachaDraw: {
        ref: 'GachaDrawMaster',
        refField: 'auditionGachaResets',
        type: OneToMany,
      },
      stock: {
        ref: 'StockMaster',
        refField: 'auditionGachaResets',
        type: OneToMany,
      },
    },
  },
  BoxGachaMaster: {
    fields: {
      stock: {
        ref: 'StockMaster',
        refField: 'boxGachas',
        type: OneToMany,
      },
      card: {
        ref: 'CardMaster',
        refField: 'boxGachas',
        type: OneToMany,
      },
    },
  },
  CardDisplayMaster: {
    fields: {
      card: {
        ref: 'CardMaster',
        refField: 'cardDisplays',
        type: OneToMany,
      },
    },
  },
  CardExpMaster: {
    id: ['level'],
  },
  CardMaster: {
    fields: {
      rarity: {
        ref: 'RarityMaster',
        refField: 'cards',
        type: OneToMany,
      },
      attribute: {
        ref: 'AttributeMaster',
        refField: 'cards',
        type: OneToMany,
      },
      character: {
        ref: 'CharacterMaster',
        refField: 'cards',
        type: OneToMany,
      },
      skillParameter: {
        ref: 'SkillMaster',
        refField: 'cards',
        type: OneToMany,
      },
      passiveSkill: {
        ref: 'PassiveSkillMaster',
        refField: 'cards',
        type: OneToMany,
      },
    },
  },
  SlotBonusTimeMaster: {
    id: ['__EventPrimaryKey__', 'ExtendCount'],
    fields: {
      event: {
        ref: 'EventMaster',
        refField: 'slotBonusTimes',
        type: OneToMany,
      },
      stock: {
        ref: 'StockMaster',
        refField: 'slotBonusTimes',
        type: OneToMany,
      },
    },
  },
  SlotRewardMaster: {
    fields: {
      stock: {
        ref: 'StockMaster',
        refField: 'slotRewards',
        type: OneToMany,
      },
    },
  },
  SlotSpecificBonusMaster: {
    fields: {
      event: {
        ref: 'EventMaster',
        refField: 'slotSpecificBonus',
        type: OneToMany,
      },
    },
  },
  RaidBossLocalPointBonusDetailMaster: {
    fields: {
      bonus: {
        ref: 'ParameterBonusMaster',
        refField: 'raidBossLocalPointBonusDetails',
        type: OneToMany,
      },
    },
  },
  RaidBossLocalPointBonusMaster: {
    fields: {},
  },
  RaidBossMaster: {
    fields: {
      aggregation: {
        ref: 'EventAggregationBaseMaster',
        refField: 'raidBoss',
        type: OneToMany,
      },
    },
  },
  CardStackItemMaster: {
    fields: {
      stock: {
        ref: 'StockMaster',
        refField: 'cardStackItems',
        type: OneToMany,
      },
    },
  },
  ChampionshipLeagueMaster: {
    fields: {
      championship: {
        ref: 'ChampionshipMaster',
        refField: 'leagues',
        type: OneToMany,
      },
    },
  },
  ChampionshipMaster: {
    fields: {},
  },
  ChampionshipSetlistMaster: {
    fields: {
      league: {
        ref: 'ChampionshipLeagueMaster',
        refField: 'setlists',
        type: OneToMany,
      },
    },
  },
  CharacterMaster: {
    fields: {
      unit: {
        ref: 'UnitMaster',
        refField: 'characters',
        type: OneToMany,
      },
    },
  },
  ChargeLimitMaster: {
    id: ['age'],
  },
  ChartAchieveMaster: {
    id: ['id', 'type', 'value'],
    fields: {
      rewardStock: {
        ref: 'StockMaster',
        refField: 'chartAchieveRewards',
        type: OneToMany,
      },
    },
  },
  ChartLessonMaster: {
    id: ['chartId', 'measureIndex'],
  },
  ChartMaster: {
    fields: {
      music: {
        ref: 'MusicMaster',
        refField: 'charts',
        type: OneToMany,
      },
      designer: {
        ref: 'ChartDesignerMaster',
        refField: 'charts',
        type: OneToMany,
      },
    },
  },
  ChartNoteCountMaster: {
    id: ['chartId', 'section'],
  },
  ClubItemDetailMaster: {
    id: ['id', 'level'],
    fields: {},
  },
  ClubItemMaster: {
    fields: {
      spot: {
        ref: 'ClubItemSpotMaster',
        refField: 'items',
        type: OneToMany,
      },
      category: {
        ref: 'ClubItemCategoryMaster',
        refField: 'items',
        type: OneToMany,
      },
    },
  },
  DJSimulatorSetlistMusicMaster: {
    id: ['setlistId', 'order'],
    fields: {
      setlist: {
        ref: 'DJSimulatorSetlistMaster',
        refField: 'musics',
        type: OneToMany,
      },
      music: {
        ref: 'MusicMaster',
        refField: 'djSimulatorSetlistMusics',
        type: OneToMany,
      },
    },
  },
  EpisodeMaster: {
    id: ['category', 'id'],
    fields: {},
  },
  EventAggregationBaseMaster: {
    fields: {
      event: {
        ref: 'EventMaster',
        refField: 'aggregations',
        type: OneToMany,
      },
    },
  },
  EventEpisodeMaster: {
    fields: {
      event: {
        ref: 'EventMaster',
        refField: 'episodes',
        type: OneToMany,
      },
    },
  },
  EventLoginBonusItemMaster: {
    id: ['loginBonusId', 'eventId', 'sequence'],
    fields: {
      loginBonus: {
        ref: 'LoginBonusMaster',
        refField: 'eventLoginBonusItems',
        type: OneToMany,
      },
    },
  },
  EventMedleySetlistMaster: {
    fields: {
      aggregation: {
        ref: 'EventAggregationBaseMaster',
        refField: 'eventMedleySetlists',
        type: OneToMany,
      },
      characterMatchParameterBonus: {
        ref: 'ParameterBonusMaster',
        refField: 'eventMedleySetlists',
        type: OneToMany,
      },
    },
  },
  EventPointRewardMaster: {
    fields: {
      aggregation: {
        ref: 'EventAggregationBaseMaster',
        refField: 'eventPointRewards',
        type: OneToMany,
      },
    },
  },
  EventRankingRewardMaster: {
    fields: {
      aggregation: {
        ref: 'EventAggregationBaseMaster',
        refField: 'eventRankingRewards',
        type: OneToMany,
      },
    },
  },
  EventSpecificBonusMaster: {
    id: ['eventId'],
    fields: {
      event: {
        ref: 'EventMaster',
        refField: 'eventSpecificBonuses',
        type: OneToMany,
      },
      characterMatchParameterBonus: {
        ref: 'ParameterBonusMaster',
        refField: 'eventSpecificBonusChara',
        type: OneToMany,
      },
      attributMmatchParameterBonus: {
        ref: 'ParameterBonusMaster',
        refField: 'eventSpecificBonusAttr',
        type: OneToMany,
      },
      allMatchParameterBonus: {
        ref: 'ParameterBonusMaster',
        refField: 'eventSpecificBonusAll',
        type: OneToMany,
      },
    },
  },
  ExchangeItemMaster: {
    fields: {
      exchange: {
        ref: 'ExchangeMaster',
        refField: 'items',
        type: OneToMany,
      },
    },
  },
  GachaBonusMaster: {
    id: ['gachaId', 'isMain'],
    fields: {
      tableRate: {
        ref: 'GachaTableRateMaster',
        refField: 'gachaBonuses',
        type: OneToMany,
      },
    },
  },
  GachaDrawMaster: {
    fields: {
      gacha: {
        ref: 'GachaMaster',
        refField: 'draws',
        type: OneToMany,
      },
      stock: {
        ref: 'StockMaster',
        refField: 'gachaDraws',
        type: OneToMany,
      },
    },
  },
  GachaMaster: {
    fields: {
      tableRates: {
        ref: 'GachaTableRateMaster',
        refField: 'gacha',
        type: ManyToMany,
      },
      pickUpCards: {
        ref: 'CardMaster',
        refField: 'gachaPickUpCards',
        type: ManyToMany,
      },
      selectBonusCards: {
        ref: 'CardMaster',
        refField: 'gachaSelectBonusCards',
        type: ManyToMany,
      },
      homeAnimationCards: {
        ref: 'CardMaster',
        refField: 'gachaHomeAnimationCards',
        type: ManyToMany,
      },
      summary: {
        ref: 'GachaSummaryWordMaster',
        refField: 'gacha',
        type: OneToMany,
      },
      detail: {
        ref: 'GachaExplanationWordMaster',
        refField: 'gacha',
        type: OneToMany,
      },
      note: {
        ref: 'GachaNotesWordMaster',
        refField: 'gacha',
        type: OneToMany,
      },
    },
  },
  HelpMaster: {
    fields: {
      category: {
        ref: 'HelpCategoryMaster',
        refField: 'helps',
        type: OneToMany,
      },
    },
  },
  HiddenMusicMixDetailMaster: {
    id: ['mixId', 'order'],
    fields: {
      mix: {
        ref: 'HiddenMusicMixMaster',
        refField: 'details',
        type: OneToMany,
      },
    },
  },
  HiddenMusicMixNoteCountMaster: {
    id: ['id', 'order', 'difficulty'],
  },
  LimitBreakItemMaster: {
    fields: {
      rarity: {
        ref: 'RarityMaster',
        refField: 'limitBreakItems',
        type: OneToMany,
      },
      attribute: {
        ref: 'AttributeMaster',
        refField: 'limitBreakItems',
        type: OneToMany,
      },
      stock: {
        ref: 'StockMaster',
        refField: 'limitBreakItems',
        type: OneToMany,
      },
    },
  },
  Live2DUIChatMaster: {
    fields: {
      character: {
        ref: 'CharacterMaster',
        refField: 'live2DUIChats',
        type: OneToMany,
      },
    },
  },
  LiveResultEpisodeMaster: {
    fields: {
      characters: {
        ref: 'CharacterMaster',
        refField: 'liveResultEpisodes',
        type: ManyToMany,
      },
    },
  },
  LiveSEMaster: {
    fields: {
      liveSEPackMaster: {
        ref: 'LiveSEPackMaster',
        refField: 'liveSEs',
        type: OneToMany,
      },
    },
  },
  LoginBonusItemMaster: {
    id: ['loginBonusId', 'sequence'],
    fields: {
      loginBonus: {
        ref: 'LoginBonusMaster',
        refField: 'items',
        type: OneToMany,
      },
    },
  },
  LoginBonusPositionTemplateMaster: {
    id: ['id', 'sequence'],
  },
  MapEventMaster: {
    fields: {
      map: {
        ref: 'MapMaster',
        refField: 'mapEvents',
        type: OneToMany,
      },
      characters: {
        ref: 'CharacterMaster',
        refField: 'mapEvents',
        type: ManyToMany,
      },
    },
  },
  LiveCutinMaster: {
    fields: {},
  },
  MapMaster: {
    fields: {},
  },
  MapMobMaster: {
    fields: {
      map: {
        ref: 'MapMaster',
        refField: 'mapMobs',
        type: OneToMany,
      },
    },
  },
  MapObjectMaster: {
    fields: {
      spot: {
        ref: 'MapObjectSpotMaster',
        refField: 'mapObjects',
        type: OneToMany,
      },
    },
  },
  MapObjectSpotMaster: {
    fields: {
      map: {
        ref: 'MapMaster',
        refField: 'mapObjectSpots',
        type: OneToMany,
      },
    },
  },
  MapSpotMaster: {
    id: ['mapId', 'spotId'],
  },
  MileageMaster: {
    id: ['rank'],
  },
  MissionDetailMaster: {
    fields: {
      panel: {
        ref: 'MissionPanelMaster',
        refField: 'details',
        type: OneToMany,
      },
      commandMaster: {
        ref: 'CommandMaster',
        refField: 'missionDetails',
        type: OneToMany,
      },
    },
  },
  MissionPanelMaster: {
    fields: {
      group: {
        ref: 'MissionGroupMaster',
        refField: 'panels',
        type: OneToMany,
      },
    },
  },
  MusicMaster: {
    fields: {
      unit: {
        ref: 'UnitMaster',
        refField: 'musics',
        type: OneToMany,
      },
    },
  },
  MusicMixMaster: {
    id: ['musicPrimaryKey', 'section'],
    fields: {
      music: {
        ref: 'MusicMaster',
        refField: 'musicMixes',
        type: OneToMany,
      },
    },
  },
  ParameterLevelMaster: {
    id: ['level'],
  },
  PassiveSkillExpMaster: {
    id: ['level', 'rarityId'],
  },
  QuestBlockMaster: {
    fields: {
      option: {
        ref: 'OptionPresetMaster',
        refField: 'questBlocks',
        type: ManyToOne,
      },
      assistOption: {
        ref: 'AssistOptionPresetMaster',
        refField: 'questBlocks',
        type: ManyToOne,
      },
      map: {
        ref: 'MapMaster',
        refField: 'questBlocks',
        type: OneToMany,
      },
      chart: {
        ref: 'ChartMaster',
        refField: 'questBlocks',
        type: OneToMany,
      },
    },
  },
  QuestClubDeckMaster: {
    id: ['id', 'spotId'],
    fields: {
      spot: {
        ref: 'ClubItemSpotMaster',
        refField: 'questClubDecks',
        type: OneToMany,
      },
      item: {
        ref: 'ClubItemMaster',
        refField: 'questClubDecks',
        type: OneToMany,
      },
    },
  },
  QuestDeckMaster: {
    id: ['id', 'order'],
    fields: {
      card: {
        ref: 'CardMaster',
        refField: 'questDecks',
        type: OneToMany,
      },
    },
  },
  SkillExpMaster: {
    id: ['level', 'rarityId'],
  },
  StockMaster: {
    fields: {
      viewCategory: {
        ref: 'StockViewCategoryMaster',
        refField: 'stocks',
        type: OneToMany,
      },
    },
  },
  TowerMaster: {
    fields: {
      characterMatchParameterBonus: {
        ref: 'ParameterBonusMaster',
        refField: 'towerChara',
        type: OneToMany,
      },
      attributeMatchParameterBonus: {
        ref: 'ParameterBonusMaster',
        refField: 'towerAttr',
        type: OneToMany,
      },
    },
  },
  TowerStageMaster: {
    id: ['towerId', 'order'],
    fields: {
      tower: {
        ref: 'TowerMaster',
        refField: 'towerStages',
        type: OneToMany,
      },
      musics: {
        ref: 'MusicMaster',
        refField: 'towerStages',
        type: ManyToMany,
      },
    },
  },
  TrumpMaster: {
    id: ['suit', 'id'],
  },
  UnitEpisodeMaster: {
    fields: {
      unit: {
        ref: 'UnitMaster',
        refField: 'episodes',
        type: OneToMany,
      },
    },
  },
  UnitExpMaster: {
    id: ['level'],
  },
  UserExpMaster: {
    id: ['level'],
  },
}

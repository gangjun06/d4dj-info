import { ModelSetting } from './types.js'

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
        key: 'command',
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
        key: 'command',
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
    id: ['musicId', 'secton'],
    fields: [
      {
        key: 'music',
        ref: 'MusicMaster',
        refField: 'musicMixes',
        type: 'OneToMany',
      },
    ],
  },
  ParameterLevelMaster: {
    id: ['level'],
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
    id: ['id', 'spotId'],
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
  },
  QuestDeckMaster: {
    id: ['id', 'order'],
    fields: [
      {
        key: 'card',
        ref: 'CardMaster',
        refField: 'questDecks',
        type: 'OneToMany',
      },
    ],
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
    id: ['towerId', 'order'],
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
  MapSpotMaster: {
    id: ['mapId', 'spotId'],
  },
  PassiveSkillExpMaster: {
    id: ['level', 'rarityId'],
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
  EventEpisodeMaster: {
    fields: [
      {
        key: 'event',
        ref: 'EventMaster',
        type: 'OneToMany',
        refField: 'episodes',
      },
    ],
    // TODO: CustomField
  },
  EventAggregationBaseMaster: {
    fields: [
      {
        key: 'event',
        ref: 'EventMaster',
        type: 'OneToMany',
        refField: 'aggregations',
      },
    ],
  },
  LiveSEMaster: {
    fields: [
      {
        key: 'liveSEMaster',
        ref: 'LiveSEPackMaster',
        type: 'OneToMany',
        refField: 'liveSEs',
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
  MileageMaster: {
    id: ['rank'],
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
    id: ['eventId'],
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
}

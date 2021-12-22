export enum SceWords {
  Title = 'タイトル',
  SubTitle = 'サブタイトル',

  Parallel = '@Parallel',
  SoundBGM = '音BGM',
  Volume = 'ボリューム',
  Background = '背景DJK',
  Live2dCharaCreate = 'Live2Dキャラ作成DJK',
  CharacterName = 'キャラ名',
  End = '@End',

  Speaker = '話',

  VoiceName = 'キュー名',
}

export enum Live2DCharaHideProperty {
  All = '全部',
}

export enum StoryAction {
  Live2DCharaHide = 'Live2Dキャラ非表示',
}

export type StoryGroup = {
  actions?: { name: string; value: string }[][]
  plain?: string
  text?: string
}

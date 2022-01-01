export enum SceWords {
  Title = 'タイトル', // ex) ［タイトル：ネクスト・ハッピーアラウンド］
  SubTitle = 'サブタイトル', // ex) ［タイトル：ネクスト・ハッピーアラウンド］

  WindowCreate = 'ウインドウ作成', // ex) ［ウインドウ作成：ウインドウ1
  PlaybackWindow = '再生ウインドウ', // ex) ［再生ウインドウ：ウインドウ1］

  Live2dCharaCreate = 'Live2Dキャラ作成DJK', // ex)［Live2Dキャラ作成DJK：りんく、 ...
  CharacterName = 'キャラ名', // ex) ...キャラ名：live2d_card_chara_070110001

  Display = '表示', // ex)［表示：ウインドウ1、 ...
  Fade = 'フェード', //ex) ...フェード：1］

  Live2dCharaFilm = 'Live2Dキャラフィルム', // ex)［Live2Dキャラフィルム：全部,
  Film = 'フィルム', // ex) ...フィルム：暗所

  SoundBGM = '音BGM', // ex)［音BGM：bgm_adv_Wakuwaku、 ...
  Volume = 'ボリューム', // ex) ...ボリューム：80］
  SoundBGMStop = '音BGM停止', // ex)［音BGM停止：2］

  Background = '背景DJK', // ex)［背景DJK：D4FES・ステージ袖］

  Speaker = '話', // ex)［話：りんく］

  Live2dCharaDisplay = 'Live2Dキャラ表示', // ex)［Live2Dキャラ表示：りんく、 ...
  Animation = 'アニメーション', // ex) ...アニメーション：idle_01_E@E_smile
  Position = '位置', // ex) ...位置：左

  Live2dCharaVoice = 'Live2Dキャラボイス', // ex)［Live2Dキャラボイス：真秀、...、リップシンク：1］
  VoiceName = 'キュー名', // ex) ...キュー名：vo_1020010020_0020_012
  LipSync = 'リップシンク', // ex) ...リップシンク：1

  Live2dCharaAnimation = 'Live2Dキャラアニメーション', // ex)［Live2Dキャラアニメーション：真秀、...
  // Animation. Same as Live2dCharaDisplay |  ex) ...アニメーション：cry_01_E@E_shame］

  Live2dCharaHide = 'Live2Dキャラ非表示', // ex) ［Live2Dキャラ非表示：全部］

  ScreenFilmDisplay = '画面フィルム表示', // ex) [画面フィルム表示：クラブライト、...
  Layer = 'レイヤー', // ex) ...レイヤー：キャラ後
  // Fade ex) 、フェード：1］

  FadeIn = 'フェードイン', // ex)［フェードイン：黒］
  FadeOut = 'フェードアウト', // ex) ［フェードアウト：黒］
}

export enum SceValues {
  // Live2DCharaHide
  HideAll = '全部',

  // Film
  FilmAll = '全部',
  FilmNormal = '通常',
  FilmDarkPlace = '暗所',

  // WindowCreate, Display
  Window1 = 'ウインドウ1',

  // [Position] Live2dCharaDisplay
  Left = '左',
  Right = '右',
  Center = '中央',

  // Fade
  FadeWhite = '白',
  FadeBlack = '黒',
  FadeCross = 'クロス',
  FadeNormal = '通常',

  // Effect
  EffectLazer = 'レーザービーム',
  EffectRain = '雨',
  EffectSnow = '雪',
  EffectClubLight = 'クラブライト',
  EffectConcentratedline = '集中線',
  EffectRecollection = '回想シーン',

  // Layer
  AfterChara = 'キャラ後',
}

export const getSceKeyName = (value: string) => {
  return Object.entries(SceWords).find(([, val]) => val === value)?.[0] || ''
}
export const getSceValueName = (value: string) => {
  return (
    Object.entries(SceValues).find(([, val]) => val === value)?.[0] || value
  )
}

export type Story = {
  meta: StoryMeta
  data: StoryData
}

export type StoryMeta = {
  live2dList: Map<string, string>
}
export type StoryData = {
  text: string
  settings: Setting[]
}[]

export type Setting = {
  name: string
  value: string
  args: Map<string, string | number | string[] | number[]>
}

export type StoryNext = {
  prev?: string
  list: string
  next?: string
}

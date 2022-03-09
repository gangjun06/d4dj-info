import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A string used to identify an i18n locale */
  I18NLocaleCode: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AssistOptionPreset = {
  __typename?: 'AssistOptionPreset';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<AssistOptionPresetRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type AssistOptionPresetLocalizationsArgs = {
  filters?: InputMaybe<AssistOptionPresetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AssistOptionPresetEntity = {
  __typename?: 'AssistOptionPresetEntity';
  attributes?: Maybe<AssistOptionPreset>;
  id?: Maybe<Scalars['ID']>;
};

export type AssistOptionPresetEntityResponse = {
  __typename?: 'AssistOptionPresetEntityResponse';
  data?: Maybe<AssistOptionPresetEntity>;
};

export type AssistOptionPresetEntityResponseCollection = {
  __typename?: 'AssistOptionPresetEntityResponseCollection';
  data: Array<AssistOptionPresetEntity>;
  meta: ResponseCollectionMeta;
};

export type AssistOptionPresetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AssistOptionPresetFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<AssistOptionPresetFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AssistOptionPresetFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AssistOptionPresetFiltersInput>>>;
  statusCode?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AssistOptionPresetInput = {
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  statusCode?: InputMaybe<Scalars['Int']>;
};

export type AssistOptionPresetRelationResponseCollection = {
  __typename?: 'AssistOptionPresetRelationResponseCollection';
  data: Array<AssistOptionPresetEntity>;
};

export type Attribute = {
  __typename?: 'Attribute';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<AttributeRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type AttributeLocalizationsArgs = {
  filters?: InputMaybe<AttributeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AttributeEntity = {
  __typename?: 'AttributeEntity';
  attributes?: Maybe<Attribute>;
  id?: Maybe<Scalars['ID']>;
};

export type AttributeEntityResponse = {
  __typename?: 'AttributeEntityResponse';
  data?: Maybe<AttributeEntity>;
};

export type AttributeEntityResponseCollection = {
  __typename?: 'AttributeEntityResponseCollection';
  data: Array<AttributeEntity>;
  meta: ResponseCollectionMeta;
};

export type AttributeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AttributeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<AttributeFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AttributeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AttributeFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AttributeInput = {
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type AttributeRelationResponseCollection = {
  __typename?: 'AttributeRelationResponseCollection';
  data: Array<AttributeEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Card = {
  __typename?: 'Card';
  attribute?: Maybe<Scalars['Int']>;
  cardIllustCenterDistanceX?: Maybe<Scalars['JSON']>;
  cardIllustHeadDistanceY?: Maybe<Scalars['JSON']>;
  cardName?: Maybe<Scalars['String']>;
  character?: Maybe<CharacterEntityResponse>;
  clothCardId?: Maybe<Scalars['Long']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  debutOrder?: Maybe<Scalars['Int']>;
  endDate?: Maybe<Scalars['DateTime']>;
  gachaMessage?: Maybe<Scalars['String']>;
  gachas?: Maybe<GachaRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CardRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  maxParameters?: Maybe<ComponentCharacterMaxParameters>;
  passiveSkill?: Maybe<PassiveSkillEntityResponse>;
  rarity?: Maybe<Scalars['Int']>;
  skill?: Maybe<SkillEntityResponse>;
  skillName?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CardGachasArgs = {
  filters?: InputMaybe<GachaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CardLocalizationsArgs = {
  filters?: InputMaybe<CardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CardEntity = {
  __typename?: 'CardEntity';
  attributes?: Maybe<Card>;
  id?: Maybe<Scalars['ID']>;
};

export type CardEntityResponse = {
  __typename?: 'CardEntityResponse';
  data?: Maybe<CardEntity>;
};

export type CardEntityResponseCollection = {
  __typename?: 'CardEntityResponseCollection';
  data: Array<CardEntity>;
  meta: ResponseCollectionMeta;
};

export type CardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CardFiltersInput>>>;
  attribute?: InputMaybe<IntFilterInput>;
  cardIllustCenterDistanceX?: InputMaybe<JsonFilterInput>;
  cardIllustHeadDistanceY?: InputMaybe<JsonFilterInput>;
  cardName?: InputMaybe<StringFilterInput>;
  character?: InputMaybe<CharacterFiltersInput>;
  clothCardId?: InputMaybe<LongFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  debutOrder?: InputMaybe<IntFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  gachaMessage?: InputMaybe<StringFilterInput>;
  gachas?: InputMaybe<GachaFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CardFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<CardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CardFiltersInput>>>;
  passiveSkill?: InputMaybe<PassiveSkillFiltersInput>;
  rarity?: InputMaybe<IntFilterInput>;
  skill?: InputMaybe<SkillFiltersInput>;
  skillName?: InputMaybe<StringFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CardInput = {
  attribute?: InputMaybe<Scalars['Int']>;
  cardIllustCenterDistanceX?: InputMaybe<Scalars['JSON']>;
  cardIllustHeadDistanceY?: InputMaybe<Scalars['JSON']>;
  cardName?: InputMaybe<Scalars['String']>;
  character?: InputMaybe<Scalars['ID']>;
  clothCardId?: InputMaybe<Scalars['Long']>;
  debutOrder?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  gachaMessage?: InputMaybe<Scalars['String']>;
  gachas?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  masterID?: InputMaybe<Scalars['Int']>;
  maxParameters?: InputMaybe<ComponentCharacterMaxParametersInput>;
  passiveSkill?: InputMaybe<Scalars['ID']>;
  rarity?: InputMaybe<Scalars['Int']>;
  skill?: InputMaybe<Scalars['ID']>;
  skillName?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type CardRelationResponseCollection = {
  __typename?: 'CardRelationResponseCollection';
  data: Array<CardEntity>;
};

export type Character = {
  __typename?: 'Character';
  cards?: Maybe<CardRelationResponseCollection>;
  colorCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  episode?: Maybe<Array<Maybe<ComponentEpisodeCharacterEpisode>>>;
  firstName?: Maybe<Scalars['String']>;
  firstNameEnglish?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  fullNameEnglish?: Maybe<Scalars['String']>;
  live2DUIChat?: Maybe<Live2DUiChatRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<CharacterRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  unit?: Maybe<UnitEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CharacterCardsArgs = {
  filters?: InputMaybe<CardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CharacterEpisodeArgs = {
  filters?: InputMaybe<ComponentEpisodeCharacterEpisodeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CharacterLive2DuiChatArgs = {
  filters?: InputMaybe<Live2DUiChatFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type CharacterLocalizationsArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CharacterEntity = {
  __typename?: 'CharacterEntity';
  attributes?: Maybe<Character>;
  id?: Maybe<Scalars['ID']>;
};

export type CharacterEntityResponse = {
  __typename?: 'CharacterEntityResponse';
  data?: Maybe<CharacterEntity>;
};

export type CharacterEntityResponseCollection = {
  __typename?: 'CharacterEntityResponseCollection';
  data: Array<CharacterEntity>;
  meta: ResponseCollectionMeta;
};

export type CharacterFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CharacterFiltersInput>>>;
  cards?: InputMaybe<CardFiltersInput>;
  colorCode?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  firstNameEnglish?: InputMaybe<StringFilterInput>;
  fullName?: InputMaybe<StringFilterInput>;
  fullNameEnglish?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  live2DUIChat?: InputMaybe<Live2DUiChatFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CharacterFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<CharacterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CharacterFiltersInput>>>;
  unit?: InputMaybe<UnitFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CharacterInput = {
  cards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  colorCode?: InputMaybe<Scalars['String']>;
  episode?: InputMaybe<Array<InputMaybe<ComponentEpisodeCharacterEpisodeInput>>>;
  firstName?: InputMaybe<Scalars['String']>;
  firstNameEnglish?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  fullNameEnglish?: InputMaybe<Scalars['String']>;
  live2DUIChat?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  masterID?: InputMaybe<Scalars['Int']>;
  unit?: InputMaybe<Scalars['ID']>;
};

export type CharacterRelationResponseCollection = {
  __typename?: 'CharacterRelationResponseCollection';
  data: Array<CharacterEntity>;
};

export type Chart = {
  __typename?: 'Chart';
  achieveId?: Maybe<Scalars['Int']>;
  chartNoteCount?: Maybe<Array<Maybe<ComponentMusicChartNoteCount>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  designer?: Maybe<ChartDesignerEntityResponse>;
  difficulty?: Maybe<Enum_Chart_Difficulty>;
  level?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ChartRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  music?: Maybe<MusicEntityResponse>;
  trends?: Maybe<ComponentMusicTrends>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ChartChartNoteCountArgs = {
  filters?: InputMaybe<ComponentMusicChartNoteCountFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ChartLocalizationsArgs = {
  filters?: InputMaybe<ChartFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ChartAchieve = {
  __typename?: 'ChartAchieve';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ChartAchieveRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  rewardAmount?: Maybe<Scalars['Int']>;
  rewardStock?: Maybe<StockEntityResponse>;
  type?: Maybe<Enum_Chartachieve_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  value?: Maybe<Scalars['Int']>;
};


export type ChartAchieveLocalizationsArgs = {
  filters?: InputMaybe<ChartAchieveFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ChartAchieveEntity = {
  __typename?: 'ChartAchieveEntity';
  attributes?: Maybe<ChartAchieve>;
  id?: Maybe<Scalars['ID']>;
};

export type ChartAchieveEntityResponse = {
  __typename?: 'ChartAchieveEntityResponse';
  data?: Maybe<ChartAchieveEntity>;
};

export type ChartAchieveEntityResponseCollection = {
  __typename?: 'ChartAchieveEntityResponseCollection';
  data: Array<ChartAchieveEntity>;
  meta: ResponseCollectionMeta;
};

export type ChartAchieveFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChartAchieveFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ChartAchieveFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ChartAchieveFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChartAchieveFiltersInput>>>;
  rewardAmount?: InputMaybe<IntFilterInput>;
  rewardStock?: InputMaybe<StockFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<IntFilterInput>;
};

export type ChartAchieveInput = {
  masterID?: InputMaybe<Scalars['Int']>;
  rewardAmount?: InputMaybe<Scalars['Int']>;
  rewardStock?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Enum_Chartachieve_Type>;
  value?: InputMaybe<Scalars['Int']>;
};

export type ChartAchieveRelationResponseCollection = {
  __typename?: 'ChartAchieveRelationResponseCollection';
  data: Array<ChartAchieveEntity>;
};

export type ChartDesigner = {
  __typename?: 'ChartDesigner';
  chart?: Maybe<ChartEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ChartDesignerRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ChartDesignerLocalizationsArgs = {
  filters?: InputMaybe<ChartDesignerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ChartDesignerEntity = {
  __typename?: 'ChartDesignerEntity';
  attributes?: Maybe<ChartDesigner>;
  id?: Maybe<Scalars['ID']>;
};

export type ChartDesignerEntityResponse = {
  __typename?: 'ChartDesignerEntityResponse';
  data?: Maybe<ChartDesignerEntity>;
};

export type ChartDesignerEntityResponseCollection = {
  __typename?: 'ChartDesignerEntityResponseCollection';
  data: Array<ChartDesignerEntity>;
  meta: ResponseCollectionMeta;
};

export type ChartDesignerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChartDesignerFiltersInput>>>;
  chart?: InputMaybe<ChartFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ChartDesignerFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ChartDesignerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChartDesignerFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChartDesignerInput = {
  chart?: InputMaybe<Scalars['ID']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ChartDesignerRelationResponseCollection = {
  __typename?: 'ChartDesignerRelationResponseCollection';
  data: Array<ChartDesignerEntity>;
};

export type ChartEntity = {
  __typename?: 'ChartEntity';
  attributes?: Maybe<Chart>;
  id?: Maybe<Scalars['ID']>;
};

export type ChartEntityResponse = {
  __typename?: 'ChartEntityResponse';
  data?: Maybe<ChartEntity>;
};

export type ChartEntityResponseCollection = {
  __typename?: 'ChartEntityResponseCollection';
  data: Array<ChartEntity>;
  meta: ResponseCollectionMeta;
};

export type ChartFiltersInput = {
  achieveId?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ChartFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  designer?: InputMaybe<ChartDesignerFiltersInput>;
  difficulty?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  level?: InputMaybe<FloatFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ChartFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  music?: InputMaybe<MusicFiltersInput>;
  not?: InputMaybe<ChartFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChartFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChartInput = {
  achieveId?: InputMaybe<Scalars['Int']>;
  chartNoteCount?: InputMaybe<Array<InputMaybe<ComponentMusicChartNoteCountInput>>>;
  designer?: InputMaybe<Scalars['ID']>;
  difficulty?: InputMaybe<Enum_Chart_Difficulty>;
  level?: InputMaybe<Scalars['Float']>;
  masterID?: InputMaybe<Scalars['Int']>;
  music?: InputMaybe<Scalars['ID']>;
  trends?: InputMaybe<ComponentMusicTrendsInput>;
};

export type ChartRelationResponseCollection = {
  __typename?: 'ChartRelationResponseCollection';
  data: Array<ChartEntity>;
};

export type ClubItem = {
  __typename?: 'ClubItem';
  conditionCardId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  detailId?: Maybe<ClubItemDetailEntityResponse>;
  endDate?: Maybe<Scalars['DateTime']>;
  groupId?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ClubItemRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  spot?: Maybe<ClubItemSpotEntityResponse>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ClubItemLocalizationsArgs = {
  filters?: InputMaybe<ClubItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ClubItemDetail = {
  __typename?: 'ClubItemDetail';
  createdAt?: Maybe<Scalars['DateTime']>;
  effectValue?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ClubItemDetailRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  requiredAmount1?: Maybe<Scalars['Int']>;
  requiredAmount2?: Maybe<Scalars['Int']>;
  requiredAmount3?: Maybe<Scalars['Int']>;
  requiredAmount4?: Maybe<Scalars['Int']>;
  requiredAmount5?: Maybe<Scalars['Int']>;
  requiredStock1?: Maybe<StockEntityResponse>;
  requiredStock2?: Maybe<StockEntityResponse>;
  requiredStock3?: Maybe<StockEntityResponse>;
  requiredStock4?: Maybe<StockEntityResponse>;
  requiredStock5?: Maybe<StockEntityResponse>;
  targetId?: Maybe<Scalars['Int']>;
  targetType?: Maybe<Enum_Clubitemdetail_Targettype>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ClubItemDetailLocalizationsArgs = {
  filters?: InputMaybe<ClubItemDetailFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ClubItemDetailEntity = {
  __typename?: 'ClubItemDetailEntity';
  attributes?: Maybe<ClubItemDetail>;
  id?: Maybe<Scalars['ID']>;
};

export type ClubItemDetailEntityResponse = {
  __typename?: 'ClubItemDetailEntityResponse';
  data?: Maybe<ClubItemDetailEntity>;
};

export type ClubItemDetailEntityResponseCollection = {
  __typename?: 'ClubItemDetailEntityResponseCollection';
  data: Array<ClubItemDetailEntity>;
  meta: ResponseCollectionMeta;
};

export type ClubItemDetailFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClubItemDetailFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  effectValue?: InputMaybe<FloatFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  level?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ClubItemDetailFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ClubItemDetailFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClubItemDetailFiltersInput>>>;
  requiredAmount1?: InputMaybe<IntFilterInput>;
  requiredAmount2?: InputMaybe<IntFilterInput>;
  requiredAmount3?: InputMaybe<IntFilterInput>;
  requiredAmount4?: InputMaybe<IntFilterInput>;
  requiredAmount5?: InputMaybe<IntFilterInput>;
  requiredStock1?: InputMaybe<StockFiltersInput>;
  requiredStock2?: InputMaybe<StockFiltersInput>;
  requiredStock3?: InputMaybe<StockFiltersInput>;
  requiredStock4?: InputMaybe<StockFiltersInput>;
  requiredStock5?: InputMaybe<StockFiltersInput>;
  targetId?: InputMaybe<IntFilterInput>;
  targetType?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClubItemDetailInput = {
  effectValue?: InputMaybe<Scalars['Float']>;
  level?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  requiredAmount1?: InputMaybe<Scalars['Int']>;
  requiredAmount2?: InputMaybe<Scalars['Int']>;
  requiredAmount3?: InputMaybe<Scalars['Int']>;
  requiredAmount4?: InputMaybe<Scalars['Int']>;
  requiredAmount5?: InputMaybe<Scalars['Int']>;
  requiredStock1?: InputMaybe<Scalars['ID']>;
  requiredStock2?: InputMaybe<Scalars['ID']>;
  requiredStock3?: InputMaybe<Scalars['ID']>;
  requiredStock4?: InputMaybe<Scalars['ID']>;
  requiredStock5?: InputMaybe<Scalars['ID']>;
  targetId?: InputMaybe<Scalars['Int']>;
  targetType?: InputMaybe<Enum_Clubitemdetail_Targettype>;
};

export type ClubItemDetailRelationResponseCollection = {
  __typename?: 'ClubItemDetailRelationResponseCollection';
  data: Array<ClubItemDetailEntity>;
};

export type ClubItemEntity = {
  __typename?: 'ClubItemEntity';
  attributes?: Maybe<ClubItem>;
  id?: Maybe<Scalars['ID']>;
};

export type ClubItemEntityResponse = {
  __typename?: 'ClubItemEntityResponse';
  data?: Maybe<ClubItemEntity>;
};

export type ClubItemEntityResponseCollection = {
  __typename?: 'ClubItemEntityResponseCollection';
  data: Array<ClubItemEntity>;
  meta: ResponseCollectionMeta;
};

export type ClubItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClubItemFiltersInput>>>;
  conditionCardId?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  detailId?: InputMaybe<ClubItemDetailFiltersInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  groupId?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ClubItemFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ClubItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClubItemFiltersInput>>>;
  spot?: InputMaybe<ClubItemSpotFiltersInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClubItemInput = {
  conditionCardId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  detailId?: InputMaybe<Scalars['ID']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  groupId?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  spot?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type ClubItemRelationResponseCollection = {
  __typename?: 'ClubItemRelationResponseCollection';
  data: Array<ClubItemEntity>;
};

export type ClubItemSpot = {
  __typename?: 'ClubItemSpot';
  category?: Maybe<Enum_Clubitemspot_Category>;
  clubItems?: Maybe<ClubItemRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ClubItemSpotRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ClubItemSpotClubItemsArgs = {
  filters?: InputMaybe<ClubItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ClubItemSpotLocalizationsArgs = {
  filters?: InputMaybe<ClubItemSpotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ClubItemSpotEntity = {
  __typename?: 'ClubItemSpotEntity';
  attributes?: Maybe<ClubItemSpot>;
  id?: Maybe<Scalars['ID']>;
};

export type ClubItemSpotEntityResponse = {
  __typename?: 'ClubItemSpotEntityResponse';
  data?: Maybe<ClubItemSpotEntity>;
};

export type ClubItemSpotEntityResponseCollection = {
  __typename?: 'ClubItemSpotEntityResponseCollection';
  data: Array<ClubItemSpotEntity>;
  meta: ResponseCollectionMeta;
};

export type ClubItemSpotFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClubItemSpotFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  clubItems?: InputMaybe<ClubItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ClubItemSpotFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ClubItemSpotFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClubItemSpotFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClubItemSpotInput = {
  category?: InputMaybe<Enum_Clubitemspot_Category>;
  clubItems?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ClubItemSpotRelationResponseCollection = {
  __typename?: 'ClubItemSpotRelationResponseCollection';
  data: Array<ClubItemSpotEntity>;
};

export type ComponentCharacterCharacters = {
  __typename?: 'ComponentCharacterCharacters';
  id: Scalars['ID'];
};

export type ComponentCharacterMaxParameters = {
  __typename?: 'ComponentCharacterMaxParameters';
  heart?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  physical?: Maybe<Scalars['Int']>;
  technique?: Maybe<Scalars['Int']>;
};

export type ComponentCharacterMaxParametersInput = {
  heart?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  physical?: InputMaybe<Scalars['Int']>;
  technique?: InputMaybe<Scalars['Int']>;
};

export type ComponentEpisodeCharacterEpisode = {
  __typename?: 'ComponentEpisodeCharacterEpisode';
  backgroundId?: Maybe<Scalars['Int']>;
  chapterNumber?: Maybe<Scalars['Int']>;
  episode?: Maybe<EpisodeEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentEpisodeCharacterEpisodeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentEpisodeCharacterEpisodeFiltersInput>>>;
  backgroundId?: InputMaybe<IntFilterInput>;
  chapterNumber?: InputMaybe<IntFilterInput>;
  episode?: InputMaybe<EpisodeFiltersInput>;
  not?: InputMaybe<ComponentEpisodeCharacterEpisodeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentEpisodeCharacterEpisodeFiltersInput>>>;
};

export type ComponentEpisodeCharacterEpisodeInput = {
  backgroundId?: InputMaybe<Scalars['Int']>;
  chapterNumber?: InputMaybe<Scalars['Int']>;
  episode?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentEpisodeEvent = {
  __typename?: 'ComponentEpisodeEvent';
  backgroundId?: Maybe<Scalars['Int']>;
  chapterNumber?: Maybe<Scalars['Int']>;
  episode?: Maybe<EpisodeEntityResponse>;
  id: Scalars['ID'];
};

export type ComponentEpisodeEventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentEpisodeEventFiltersInput>>>;
  backgroundId?: InputMaybe<IntFilterInput>;
  chapterNumber?: InputMaybe<IntFilterInput>;
  episode?: InputMaybe<EpisodeFiltersInput>;
  not?: InputMaybe<ComponentEpisodeEventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentEpisodeEventFiltersInput>>>;
};

export type ComponentEpisodeEventInput = {
  backgroundId?: InputMaybe<Scalars['Int']>;
  chapterNumber?: InputMaybe<Scalars['Int']>;
  episode?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentEpisodeUnitEpisode = {
  __typename?: 'ComponentEpisodeUnitEpisode';
  backgroundId?: Maybe<Scalars['Int']>;
  chapterNumber?: Maybe<Scalars['Int']>;
  episode?: Maybe<EpisodeEntityResponse>;
  id: Scalars['ID'];
  season?: Maybe<Scalars['Int']>;
};

export type ComponentEpisodeUnitEpisodeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentEpisodeUnitEpisodeFiltersInput>>>;
  backgroundId?: InputMaybe<IntFilterInput>;
  chapterNumber?: InputMaybe<IntFilterInput>;
  episode?: InputMaybe<EpisodeFiltersInput>;
  not?: InputMaybe<ComponentEpisodeUnitEpisodeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentEpisodeUnitEpisodeFiltersInput>>>;
  season?: InputMaybe<IntFilterInput>;
};

export type ComponentEpisodeUnitEpisodeInput = {
  backgroundId?: InputMaybe<Scalars['Int']>;
  chapterNumber?: InputMaybe<Scalars['Int']>;
  episode?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  season?: InputMaybe<Scalars['Int']>;
};

export type ComponentGameCondition = {
  __typename?: 'ComponentGameCondition';
  category?: Maybe<Enum_Componentgamecondition_Category>;
  id: Scalars['ID'];
  masterID?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['JSON']>;
};

export type ComponentGameConditionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGameConditionFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentGameConditionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGameConditionFiltersInput>>>;
  value?: InputMaybe<JsonFilterInput>;
};

export type ComponentGameConditionInput = {
  category?: InputMaybe<Enum_Componentgamecondition_Category>;
  id?: InputMaybe<Scalars['ID']>;
  masterID?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['JSON']>;
};

export type ComponentGameLoginBonusItem = {
  __typename?: 'ComponentGameLoginBonusItem';
  id: Scalars['ID'];
  positions?: Maybe<Scalars['JSON']>;
  rewards?: Maybe<RewardRelationResponseCollection>;
  sequence?: Maybe<Scalars['Int']>;
};


export type ComponentGameLoginBonusItemRewardsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentGameLoginBonusItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGameLoginBonusItemFiltersInput>>>;
  not?: InputMaybe<ComponentGameLoginBonusItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGameLoginBonusItemFiltersInput>>>;
  positions?: InputMaybe<JsonFilterInput>;
  rewards?: InputMaybe<RewardFiltersInput>;
  sequence?: InputMaybe<IntFilterInput>;
};

export type ComponentGameLoginBonusItemInput = {
  id?: InputMaybe<Scalars['ID']>;
  positions?: InputMaybe<Scalars['JSON']>;
  rewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sequence?: InputMaybe<Scalars['Int']>;
};

export type ComponentGameRandomStock = {
  __typename?: 'ComponentGameRandomStock';
  amount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  rate?: Maybe<Scalars['Int']>;
  stockId?: Maybe<Scalars['Int']>;
};

export type ComponentGameRandomStockFiltersInput = {
  amount?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentGameRandomStockFiltersInput>>>;
  not?: InputMaybe<ComponentGameRandomStockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGameRandomStockFiltersInput>>>;
  rate?: InputMaybe<IntFilterInput>;
  stockId?: InputMaybe<IntFilterInput>;
};

export type ComponentGameRandomStockInput = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  rate?: InputMaybe<Scalars['Int']>;
  stockId?: InputMaybe<Scalars['Int']>;
};

export type ComponentMusicChartNoteCount = {
  __typename?: 'ComponentMusicChartNoteCount';
  count?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  section?: Maybe<Enum_Componentmusicchartnotecount_Section>;
};

export type ComponentMusicChartNoteCountFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMusicChartNoteCountFiltersInput>>>;
  count?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentMusicChartNoteCountFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMusicChartNoteCountFiltersInput>>>;
  section?: InputMaybe<StringFilterInput>;
};

export type ComponentMusicChartNoteCountInput = {
  count?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  section?: InputMaybe<Enum_Componentmusicchartnotecount_Section>;
};

export type ComponentMusicMusicMix = {
  __typename?: 'ComponentMusicMusicMix';
  enableLongMixEnd?: Maybe<Scalars['Boolean']>;
  enableLongMixStart?: Maybe<Scalars['Boolean']>;
  endTime?: Maybe<Scalars['Float']>;
  endTimeBpm?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  section?: Maybe<Enum_Componentmusicmusicmix_Section>;
  startTime?: Maybe<Scalars['Float']>;
  startTimeBpm?: Maybe<Scalars['Float']>;
};

export type ComponentMusicMusicMixFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMusicMusicMixFiltersInput>>>;
  enableLongMixEnd?: InputMaybe<BooleanFilterInput>;
  enableLongMixStart?: InputMaybe<BooleanFilterInput>;
  endTime?: InputMaybe<FloatFilterInput>;
  endTimeBpm?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<ComponentMusicMusicMixFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentMusicMusicMixFiltersInput>>>;
  section?: InputMaybe<StringFilterInput>;
  startTime?: InputMaybe<FloatFilterInput>;
  startTimeBpm?: InputMaybe<FloatFilterInput>;
};

export type ComponentMusicMusicMixInput = {
  enableLongMixEnd?: InputMaybe<Scalars['Boolean']>;
  enableLongMixStart?: InputMaybe<Scalars['Boolean']>;
  endTime?: InputMaybe<Scalars['Float']>;
  endTimeBpm?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['ID']>;
  section?: InputMaybe<Enum_Componentmusicmusicmix_Section>;
  startTime?: InputMaybe<Scalars['Float']>;
  startTimeBpm?: InputMaybe<Scalars['Float']>;
};

export type ComponentMusicTrends = {
  __typename?: 'ComponentMusicTrends';
  danger?: Maybe<Scalars['Float']>;
  effect?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  notes?: Maybe<Scalars['Float']>;
  scratch?: Maybe<Scalars['Float']>;
  technique?: Maybe<Scalars['Float']>;
};

export type ComponentMusicTrendsInput = {
  danger?: InputMaybe<Scalars['Float']>;
  effect?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['ID']>;
  notes?: InputMaybe<Scalars['Float']>;
  scratch?: InputMaybe<Scalars['Float']>;
  technique?: InputMaybe<Scalars['Float']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Chartachieve_Type {
  ClearCount = 'ClearCount',
  Combo = 'Combo',
  Score = 'Score'
}

export enum Enum_Chart_Difficulty {
  Easy = 'Easy',
  Expert = 'Expert',
  Hard = 'Hard',
  Normal = 'Normal'
}

export enum Enum_Clubitemdetail_Targettype {
  All = 'All',
  Attribute = 'Attribute',
  Character = 'Character',
  None = 'None',
  Parameter = 'Parameter',
  Unit = 'Unit'
}

export enum Enum_Clubitemspot_Category {
  Ceiling = 'Ceiling',
  Club = 'Club',
  Dj = 'DJ',
  Stage = 'Stage'
}

export enum Enum_Componentgamecondition_Category {
  CharacterRank = 'CharacterRank',
  EventPoint = 'EventPoint',
  None = 'None',
  Story = 'Story',
  UnitLevel = 'UnitLevel',
  UserLevel = 'UserLevel'
}

export enum Enum_Componentmusicchartnotecount_Section {
  Begin = 'Begin',
  End = 'End',
  Full = 'Full',
  Middle = 'Middle'
}

export enum Enum_Componentmusicmusicmix_Section {
  Begin = 'Begin',
  DjSimulator = 'DJSimulator',
  End = 'End',
  Full = 'Full',
  Middle = 'Middle'
}

export enum Enum_Episode_Category {
  Card = 'Card',
  Character = 'Character',
  Event = 'Event',
  LiveResult = 'LiveResult',
  Map = 'Map',
  Unit = 'Unit'
}

export enum Enum_Eventaggregationbase_Aggregationtype {
  CommonAddPoint = 'CommonAddPoint',
  DailyAddPoint = 'DailyAddPoint',
  EngineSpecific = 'EngineSpecific',
  Highscore = 'Highscore',
  MainAddPoint = 'MainAddPoint'
}

export enum Enum_Eventpointreward_Category {
  Card = 'Card',
  ClubItem = 'ClubItem',
  DuplicateCard = 'DuplicateCard',
  Episode = 'Episode',
  Honor = 'Honor',
  Movie = 'Movie',
  Music = 'Music',
  Stamp = 'Stamp',
  Stock = 'Stock'
}

export enum Enum_Eventrankingreward_Category {
  Card = 'Card',
  ClubItem = 'ClubItem',
  DuplicateCard = 'DuplicateCard',
  Episode = 'Episode',
  Honor = 'Honor',
  Movie = 'Movie',
  Music = 'Music',
  Stamp = 'Stamp',
  Stock = 'Stock'
}

export enum Enum_Event_Type {
  Bingo = 'Bingo',
  Etc = 'Etc',
  Medley = 'Medley',
  Poker = 'Poker',
  Raid = 'Raid',
  Slot = 'Slot'
}

export enum Enum_Exchangeitem_Rewardcategory {
  Card = 'Card',
  ClubItem = 'ClubItem',
  DuplicateCard = 'DuplicateCard',
  Episode = 'Episode',
  Honor = 'Honor',
  Movie = 'Movie',
  Music = 'Music',
  Stamp = 'Stamp',
  Stock = 'Stock'
}

export enum Enum_Gacha_Category {
  Birthday = 'Birthday',
  Event = 'Event',
  Normal = 'Normal',
  Revival = 'Revival',
  Special = 'Special',
  StartDash = 'StartDash',
  Tutorial = 'Tutorial'
}

export enum Enum_Gacha_Type {
  Audition = 'Audition',
  Normal = 'Normal',
  StepUp = 'StepUp'
}

export enum Enum_Honor_Type {
  Character = 'Character',
  Common = 'Common',
  D4Pass = 'D4Pass',
  Event = 'Event',
  Mission = 'Mission'
}

export enum Enum_Loginbonus_Type {
  Campaign = 'Campaign',
  Common = 'Common',
  Subscription = 'Subscription',
  VipBronze = 'VipBronze',
  VipGold = 'VipGold',
  VipPlatinum = 'VipPlatinum',
  VipSilver = 'VipSilver'
}

export enum Enum_Missiongroup_Category {
  Achievement = 'Achievement',
  Chart = 'Chart',
  TimeLimited = 'TimeLimited',
  Tutorial = 'Tutorial'
}

export enum Enum_Music_Category {
  Collabo = 'Collabo',
  Cover = 'Cover',
  Game = 'Game',
  Instrumental = 'Instrumental',
  Original = 'Original'
}

export enum Enum_Questblock_Chartsection {
  Begin = 'Begin',
  DjSimulator = 'DJSimulator',
  End = 'End',
  Full = 'Full',
  Middle = 'Middle'
}

export enum Enum_Questblock_Conditiontype {
  BadCount = 'BadCount',
  GoodCount = 'GoodCount',
  GreatCount = 'GreatCount',
  Hp = 'Hp',
  MaxCombo = 'MaxCombo',
  MissCount = 'MissCount',
  Score = 'Score'
}

export enum Enum_Questdeck_Illusttype {
  LimitBreak = 'LimitBreak',
  MaxLimitBreak = 'MaxLimitBreak',
  Normal = 'Normal'
}

export enum Enum_Reward_Category {
  Card = 'Card',
  ClubItem = 'ClubItem',
  DuplicateCard = 'DuplicateCard',
  Episode = 'Episode',
  Honor = 'Honor',
  Movie = 'Movie',
  Music = 'Music',
  Stamp = 'Stamp',
  Stock = 'Stock'
}

export enum Enum_Stamp_Category {
  Collabo = 'Collabo',
  Common = 'Common',
  Rare = 'Rare'
}

export enum Enum_Stock_Category {
  Boost = 'Boost',
  CardStack = 'CardStack',
  Diamond = 'Diamond',
  Event = 'Event',
  Exp = 'Exp',
  Fragment = 'Fragment',
  GachaTicket = 'GachaTicket',
  LimitBreak = 'LimitBreak',
  MusicShop = 'MusicShop',
  Other = 'Other',
  ParameterLevelUp = 'ParameterLevelUp',
  Random = 'Random',
  SkillExp = 'SkillExp',
  VoltageRecovery = 'VoltageRecovery'
}

export type Episode = {
  __typename?: 'Episode';
  category?: Maybe<Enum_Episode_Category>;
  condition?: Maybe<Array<Maybe<ComponentGameCondition>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  hasVoice?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EpisodeRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  rewards?: Maybe<Scalars['JSON']>;
  startDate?: Maybe<Scalars['DateTime']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EpisodeConditionArgs = {
  filters?: InputMaybe<ComponentGameConditionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EpisodeLocalizationsArgs = {
  filters?: InputMaybe<EpisodeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EpisodeEntity = {
  __typename?: 'EpisodeEntity';
  attributes?: Maybe<Episode>;
  id?: Maybe<Scalars['ID']>;
};

export type EpisodeEntityResponse = {
  __typename?: 'EpisodeEntityResponse';
  data?: Maybe<EpisodeEntity>;
};

export type EpisodeEntityResponseCollection = {
  __typename?: 'EpisodeEntityResponseCollection';
  data: Array<EpisodeEntity>;
  meta: ResponseCollectionMeta;
};

export type EpisodeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EpisodeFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  hasVoice?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EpisodeFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<EpisodeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EpisodeFiltersInput>>>;
  rewards?: InputMaybe<JsonFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EpisodeInput = {
  category?: InputMaybe<Enum_Episode_Category>;
  condition?: InputMaybe<Array<InputMaybe<ComponentGameConditionInput>>>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  hasVoice?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  rewards?: InputMaybe<Scalars['JSON']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EpisodeRelationResponseCollection = {
  __typename?: 'EpisodeRelationResponseCollection';
  data: Array<EpisodeEntity>;
};

export type Event = {
  __typename?: 'Event';
  bgmPath?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  entryBonusStockAmount?: Maybe<Scalars['Int']>;
  episode?: Maybe<Array<Maybe<ComponentEpisodeEvent>>>;
  episodeCharacters?: Maybe<Scalars['JSON']>;
  eventAggregationBases?: Maybe<EventAggregationBaseRelationResponseCollection>;
  eventSpecificBonus?: Maybe<EventSpecificBonusEntityResponse>;
  exchangeShopId?: Maybe<Scalars['Int']>;
  isD4FesStory?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  rankFixStartDate?: Maybe<Scalars['DateTime']>;
  receptionCloseDate?: Maybe<Scalars['DateTime']>;
  resultAnnouncementDate?: Maybe<Scalars['DateTime']>;
  showExchangeButton?: Maybe<Scalars['Boolean']>;
  showMissionButton?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['DateTime']>;
  stockAmountPerUse?: Maybe<Scalars['Int']>;
  stockId?: Maybe<Scalars['Int']>;
  storyUnlockDate?: Maybe<Scalars['DateTime']>;
  topPrefabPath?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Event_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventEpisodeArgs = {
  filters?: InputMaybe<ComponentEpisodeEventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventEventAggregationBasesArgs = {
  filters?: InputMaybe<EventAggregationBaseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventLocalizationsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventAggregationBase = {
  __typename?: 'EventAggregationBase';
  aggregationType?: Maybe<Enum_Eventaggregationbase_Aggregationtype>;
  createdAt?: Maybe<Scalars['DateTime']>;
  event?: Maybe<EventEntityResponse>;
  eventMedleySetlists?: Maybe<EventMedleySetlistRelationResponseCollection>;
  eventPointRewards?: Maybe<EventPointRewardRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventAggregationBaseRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  pointTypeIconName?: Maybe<Scalars['String']>;
  pointTypeName?: Maybe<Scalars['String']>;
  rankingRewards?: Maybe<EventRankingRewardRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventAggregationBaseEventMedleySetlistsArgs = {
  filters?: InputMaybe<EventMedleySetlistFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventAggregationBaseEventPointRewardsArgs = {
  filters?: InputMaybe<EventPointRewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventAggregationBaseLocalizationsArgs = {
  filters?: InputMaybe<EventAggregationBaseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventAggregationBaseRankingRewardsArgs = {
  filters?: InputMaybe<EventRankingRewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventAggregationBaseEntity = {
  __typename?: 'EventAggregationBaseEntity';
  attributes?: Maybe<EventAggregationBase>;
  id?: Maybe<Scalars['ID']>;
};

export type EventAggregationBaseEntityResponse = {
  __typename?: 'EventAggregationBaseEntityResponse';
  data?: Maybe<EventAggregationBaseEntity>;
};

export type EventAggregationBaseEntityResponseCollection = {
  __typename?: 'EventAggregationBaseEntityResponseCollection';
  data: Array<EventAggregationBaseEntity>;
  meta: ResponseCollectionMeta;
};

export type EventAggregationBaseFiltersInput = {
  aggregationType?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<EventAggregationBaseFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  eventMedleySetlists?: InputMaybe<EventMedleySetlistFiltersInput>;
  eventPointRewards?: InputMaybe<EventPointRewardFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventAggregationBaseFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<EventAggregationBaseFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventAggregationBaseFiltersInput>>>;
  pointTypeIconName?: InputMaybe<StringFilterInput>;
  pointTypeName?: InputMaybe<StringFilterInput>;
  rankingRewards?: InputMaybe<EventRankingRewardFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventAggregationBaseInput = {
  aggregationType?: InputMaybe<Enum_Eventaggregationbase_Aggregationtype>;
  event?: InputMaybe<Scalars['ID']>;
  eventMedleySetlists?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  eventPointRewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  masterID?: InputMaybe<Scalars['Int']>;
  pointTypeIconName?: InputMaybe<Scalars['String']>;
  pointTypeName?: InputMaybe<Scalars['String']>;
  rankingRewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EventAggregationBaseRelationResponseCollection = {
  __typename?: 'EventAggregationBaseRelationResponseCollection';
  data: Array<EventAggregationBaseEntity>;
};

export type EventEntity = {
  __typename?: 'EventEntity';
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars['ID']>;
};

export type EventEntityResponse = {
  __typename?: 'EventEntityResponse';
  data?: Maybe<EventEntity>;
};

export type EventEntityResponseCollection = {
  __typename?: 'EventEntityResponseCollection';
  data: Array<EventEntity>;
  meta: ResponseCollectionMeta;
};

export type EventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  bgmPath?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  entryBonusStockAmount?: InputMaybe<IntFilterInput>;
  episodeCharacters?: InputMaybe<JsonFilterInput>;
  eventAggregationBases?: InputMaybe<EventAggregationBaseFiltersInput>;
  eventSpecificBonus?: InputMaybe<EventSpecificBonusFiltersInput>;
  exchangeShopId?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isD4FesStory?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  rankFixStartDate?: InputMaybe<DateTimeFilterInput>;
  receptionCloseDate?: InputMaybe<DateTimeFilterInput>;
  resultAnnouncementDate?: InputMaybe<DateTimeFilterInput>;
  showExchangeButton?: InputMaybe<BooleanFilterInput>;
  showMissionButton?: InputMaybe<BooleanFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  stockAmountPerUse?: InputMaybe<IntFilterInput>;
  stockId?: InputMaybe<IntFilterInput>;
  storyUnlockDate?: InputMaybe<DateTimeFilterInput>;
  topPrefabPath?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventInput = {
  bgmPath?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  entryBonusStockAmount?: InputMaybe<Scalars['Int']>;
  episode?: InputMaybe<Array<InputMaybe<ComponentEpisodeEventInput>>>;
  episodeCharacters?: InputMaybe<Scalars['JSON']>;
  eventAggregationBases?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  eventSpecificBonus?: InputMaybe<Scalars['ID']>;
  exchangeShopId?: InputMaybe<Scalars['Int']>;
  isD4FesStory?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  rankFixStartDate?: InputMaybe<Scalars['DateTime']>;
  receptionCloseDate?: InputMaybe<Scalars['DateTime']>;
  resultAnnouncementDate?: InputMaybe<Scalars['DateTime']>;
  showExchangeButton?: InputMaybe<Scalars['Boolean']>;
  showMissionButton?: InputMaybe<Scalars['Boolean']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  stockAmountPerUse?: InputMaybe<Scalars['Int']>;
  stockId?: InputMaybe<Scalars['Int']>;
  storyUnlockDate?: InputMaybe<Scalars['DateTime']>;
  topPrefabPath?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Event_Type>;
};

export type EventMedleySetlist = {
  __typename?: 'EventMedleySetlist';
  aggregation?: Maybe<EventAggregationBaseEntityResponse>;
  characterMatchParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventMedleySetlistRelationResponseCollection>;
  musics?: Maybe<MusicRelationResponseCollection>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  requiredPoint?: Maybe<Scalars['Int']>;
  specificBonusCharacterIds?: Maybe<CharacterRelationResponseCollection>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventMedleySetlistLocalizationsArgs = {
  filters?: InputMaybe<EventMedleySetlistFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventMedleySetlistMusicsArgs = {
  filters?: InputMaybe<MusicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventMedleySetlistSpecificBonusCharacterIdsArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventMedleySetlistEntity = {
  __typename?: 'EventMedleySetlistEntity';
  attributes?: Maybe<EventMedleySetlist>;
  id?: Maybe<Scalars['ID']>;
};

export type EventMedleySetlistEntityResponse = {
  __typename?: 'EventMedleySetlistEntityResponse';
  data?: Maybe<EventMedleySetlistEntity>;
};

export type EventMedleySetlistEntityResponseCollection = {
  __typename?: 'EventMedleySetlistEntityResponseCollection';
  data: Array<EventMedleySetlistEntity>;
  meta: ResponseCollectionMeta;
};

export type EventMedleySetlistFiltersInput = {
  aggregation?: InputMaybe<EventAggregationBaseFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<EventMedleySetlistFiltersInput>>>;
  characterMatchParameterBonus?: InputMaybe<ParameterBonusFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventMedleySetlistFiltersInput>;
  musics?: InputMaybe<MusicFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventMedleySetlistFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventMedleySetlistFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  requiredPoint?: InputMaybe<IntFilterInput>;
  specificBonusCharacterIds?: InputMaybe<CharacterFiltersInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventMedleySetlistInput = {
  aggregation?: InputMaybe<Scalars['ID']>;
  characterMatchParameterBonus?: InputMaybe<Scalars['ID']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  musics?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  requiredPoint?: InputMaybe<Scalars['Int']>;
  specificBonusCharacterIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type EventMedleySetlistRelationResponseCollection = {
  __typename?: 'EventMedleySetlistRelationResponseCollection';
  data: Array<EventMedleySetlistEntity>;
};

export type EventPointReward = {
  __typename?: 'EventPointReward';
  aggregation?: Maybe<EventAggregationBaseEntityResponse>;
  amount?: Maybe<Scalars['Int']>;
  category?: Maybe<Enum_Eventpointreward_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventPointRewardRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  requiredPoint?: Maybe<Scalars['Int']>;
  rewardId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventPointRewardLocalizationsArgs = {
  filters?: InputMaybe<EventPointRewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventPointRewardEntity = {
  __typename?: 'EventPointRewardEntity';
  attributes?: Maybe<EventPointReward>;
  id?: Maybe<Scalars['ID']>;
};

export type EventPointRewardEntityResponse = {
  __typename?: 'EventPointRewardEntityResponse';
  data?: Maybe<EventPointRewardEntity>;
};

export type EventPointRewardEntityResponseCollection = {
  __typename?: 'EventPointRewardEntityResponseCollection';
  data: Array<EventPointRewardEntity>;
  meta: ResponseCollectionMeta;
};

export type EventPointRewardFiltersInput = {
  aggregation?: InputMaybe<EventAggregationBaseFiltersInput>;
  amount?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<EventPointRewardFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventPointRewardFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<EventPointRewardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventPointRewardFiltersInput>>>;
  requiredPoint?: InputMaybe<IntFilterInput>;
  rewardId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventPointRewardInput = {
  aggregation?: InputMaybe<Scalars['ID']>;
  amount?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Enum_Eventpointreward_Category>;
  masterID?: InputMaybe<Scalars['Int']>;
  requiredPoint?: InputMaybe<Scalars['Int']>;
  rewardId?: InputMaybe<Scalars['Int']>;
};

export type EventPointRewardRelationResponseCollection = {
  __typename?: 'EventPointRewardRelationResponseCollection';
  data: Array<EventPointRewardEntity>;
};

export type EventRankingReward = {
  __typename?: 'EventRankingReward';
  aggregation?: Maybe<EventAggregationBaseEntityResponse>;
  amount?: Maybe<Scalars['Int']>;
  category?: Maybe<Enum_Eventrankingreward_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  highestRanking?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventRankingRewardRelationResponseCollection>;
  lowestRanking?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventRankingRewardLocalizationsArgs = {
  filters?: InputMaybe<EventRankingRewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventRankingRewardEntity = {
  __typename?: 'EventRankingRewardEntity';
  attributes?: Maybe<EventRankingReward>;
  id?: Maybe<Scalars['ID']>;
};

export type EventRankingRewardEntityResponse = {
  __typename?: 'EventRankingRewardEntityResponse';
  data?: Maybe<EventRankingRewardEntity>;
};

export type EventRankingRewardEntityResponseCollection = {
  __typename?: 'EventRankingRewardEntityResponseCollection';
  data: Array<EventRankingRewardEntity>;
  meta: ResponseCollectionMeta;
};

export type EventRankingRewardFiltersInput = {
  aggregation?: InputMaybe<EventAggregationBaseFiltersInput>;
  amount?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<EventRankingRewardFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  highestRanking?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventRankingRewardFiltersInput>;
  lowestRanking?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<EventRankingRewardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventRankingRewardFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventRankingRewardInput = {
  aggregation?: InputMaybe<Scalars['ID']>;
  amount?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Enum_Eventrankingreward_Category>;
  highestRanking?: InputMaybe<Scalars['Int']>;
  lowestRanking?: InputMaybe<Scalars['Int']>;
};

export type EventRankingRewardRelationResponseCollection = {
  __typename?: 'EventRankingRewardRelationResponseCollection';
  data: Array<EventRankingRewardEntity>;
};

export type EventRelationResponseCollection = {
  __typename?: 'EventRelationResponseCollection';
  data: Array<EventEntity>;
};

export type EventSpecificBonus = {
  __typename?: 'EventSpecificBonus';
  allMatchParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  allMatchPointBonusValue?: Maybe<Scalars['Int']>;
  attribute?: Maybe<AttributeEntityResponse>;
  attributeMatchParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  attributeMatchPointBonusValue?: Maybe<Scalars['Int']>;
  characterMatchParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  characterMatchPointBonusValue?: Maybe<Scalars['Int']>;
  characters?: Maybe<CharacterRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  event?: Maybe<EventEntityResponse>;
  eventPointParameterBonusId?: Maybe<Scalars['Int']>;
  eventPointParameterBonusRate?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<EventSpecificBonusRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type EventSpecificBonusCharactersArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventSpecificBonusLocalizationsArgs = {
  filters?: InputMaybe<EventSpecificBonusFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type EventSpecificBonusEntity = {
  __typename?: 'EventSpecificBonusEntity';
  attributes?: Maybe<EventSpecificBonus>;
  id?: Maybe<Scalars['ID']>;
};

export type EventSpecificBonusEntityResponse = {
  __typename?: 'EventSpecificBonusEntityResponse';
  data?: Maybe<EventSpecificBonusEntity>;
};

export type EventSpecificBonusEntityResponseCollection = {
  __typename?: 'EventSpecificBonusEntityResponseCollection';
  data: Array<EventSpecificBonusEntity>;
  meta: ResponseCollectionMeta;
};

export type EventSpecificBonusFiltersInput = {
  allMatchParameterBonus?: InputMaybe<ParameterBonusFiltersInput>;
  allMatchPointBonusValue?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<EventSpecificBonusFiltersInput>>>;
  attribute?: InputMaybe<AttributeFiltersInput>;
  attributeMatchParameterBonus?: InputMaybe<ParameterBonusFiltersInput>;
  attributeMatchPointBonusValue?: InputMaybe<IntFilterInput>;
  characterMatchParameterBonus?: InputMaybe<ParameterBonusFiltersInput>;
  characterMatchPointBonusValue?: InputMaybe<IntFilterInput>;
  characters?: InputMaybe<CharacterFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  eventPointParameterBonusId?: InputMaybe<IntFilterInput>;
  eventPointParameterBonusRate?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<EventSpecificBonusFiltersInput>;
  not?: InputMaybe<EventSpecificBonusFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventSpecificBonusFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventSpecificBonusInput = {
  allMatchParameterBonus?: InputMaybe<Scalars['ID']>;
  allMatchPointBonusValue?: InputMaybe<Scalars['Int']>;
  attribute?: InputMaybe<Scalars['ID']>;
  attributeMatchParameterBonus?: InputMaybe<Scalars['ID']>;
  attributeMatchPointBonusValue?: InputMaybe<Scalars['Int']>;
  characterMatchParameterBonus?: InputMaybe<Scalars['ID']>;
  characterMatchPointBonusValue?: InputMaybe<Scalars['Int']>;
  characters?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  event?: InputMaybe<Scalars['ID']>;
  eventPointParameterBonusId?: InputMaybe<Scalars['Int']>;
  eventPointParameterBonusRate?: InputMaybe<Scalars['Int']>;
};

export type EventSpecificBonusRelationResponseCollection = {
  __typename?: 'EventSpecificBonusRelationResponseCollection';
  data: Array<EventSpecificBonusEntity>;
};

export type Exchange = {
  __typename?: 'Exchange';
  categoryName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryDate?: Maybe<Scalars['DateTime']>;
  deliveryEffectId?: Maybe<Scalars['Int']>;
  exchangeItems?: Maybe<ExchangeItemRelationResponseCollection>;
  isPollingPlace?: Maybe<Scalars['Boolean']>;
  isSecret?: Maybe<Scalars['Boolean']>;
  isTabVisible?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ExchangeRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  secretName?: Maybe<Scalars['String']>;
  showPollingGauge?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ExchangeExchangeItemsArgs = {
  filters?: InputMaybe<ExchangeItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ExchangeLocalizationsArgs = {
  filters?: InputMaybe<ExchangeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ExchangeEntity = {
  __typename?: 'ExchangeEntity';
  attributes?: Maybe<Exchange>;
  id?: Maybe<Scalars['ID']>;
};

export type ExchangeEntityResponse = {
  __typename?: 'ExchangeEntityResponse';
  data?: Maybe<ExchangeEntity>;
};

export type ExchangeEntityResponseCollection = {
  __typename?: 'ExchangeEntityResponseCollection';
  data: Array<ExchangeEntity>;
  meta: ResponseCollectionMeta;
};

export type ExchangeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ExchangeFiltersInput>>>;
  categoryName?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deliveryDate?: InputMaybe<DateTimeFilterInput>;
  deliveryEffectId?: InputMaybe<IntFilterInput>;
  exchangeItems?: InputMaybe<ExchangeItemFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isPollingPlace?: InputMaybe<BooleanFilterInput>;
  isSecret?: InputMaybe<BooleanFilterInput>;
  isTabVisible?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ExchangeFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ExchangeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ExchangeFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  secretName?: InputMaybe<StringFilterInput>;
  showPollingGauge?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ExchangeInput = {
  categoryName?: InputMaybe<Scalars['String']>;
  deliveryDate?: InputMaybe<Scalars['DateTime']>;
  deliveryEffectId?: InputMaybe<Scalars['Int']>;
  exchangeItems?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isPollingPlace?: InputMaybe<Scalars['Boolean']>;
  isSecret?: InputMaybe<Scalars['Boolean']>;
  isTabVisible?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  secretName?: InputMaybe<Scalars['String']>;
  showPollingGauge?: InputMaybe<Scalars['Boolean']>;
};

export type ExchangeItem = {
  __typename?: 'ExchangeItem';
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  exchange?: Maybe<ExchangeEntityResponse>;
  exchangeCount?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ExchangeItemRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  recommend?: Maybe<Scalars['Boolean']>;
  requiredAmount1?: Maybe<Scalars['Int']>;
  requiredAmount2?: Maybe<Scalars['Int']>;
  requiredAmount3?: Maybe<Scalars['Int']>;
  requiredAmount4?: Maybe<Scalars['Int']>;
  requiredStock1?: Maybe<StockEntityResponse>;
  requiredStock2?: Maybe<StockEntityResponse>;
  requiredStock3?: Maybe<StockEntityResponse>;
  requiredStock4?: Maybe<StockEntityResponse>;
  resetType?: Maybe<Scalars['String']>;
  resetValue?: Maybe<Scalars['Int']>;
  rewardAmount?: Maybe<Scalars['Int']>;
  rewardCategory?: Maybe<Enum_Exchangeitem_Rewardcategory>;
  rewardId?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ExchangeItemLocalizationsArgs = {
  filters?: InputMaybe<ExchangeItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ExchangeItemEntity = {
  __typename?: 'ExchangeItemEntity';
  attributes?: Maybe<ExchangeItem>;
  id?: Maybe<Scalars['ID']>;
};

export type ExchangeItemEntityResponse = {
  __typename?: 'ExchangeItemEntityResponse';
  data?: Maybe<ExchangeItemEntity>;
};

export type ExchangeItemEntityResponseCollection = {
  __typename?: 'ExchangeItemEntityResponseCollection';
  data: Array<ExchangeItemEntity>;
  meta: ResponseCollectionMeta;
};

export type ExchangeItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ExchangeItemFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  exchange?: InputMaybe<ExchangeFiltersInput>;
  exchangeCount?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ExchangeItemFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ExchangeItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ExchangeItemFiltersInput>>>;
  recommend?: InputMaybe<BooleanFilterInput>;
  requiredAmount1?: InputMaybe<IntFilterInput>;
  requiredAmount2?: InputMaybe<IntFilterInput>;
  requiredAmount3?: InputMaybe<IntFilterInput>;
  requiredAmount4?: InputMaybe<IntFilterInput>;
  requiredStock1?: InputMaybe<StockFiltersInput>;
  requiredStock2?: InputMaybe<StockFiltersInput>;
  requiredStock3?: InputMaybe<StockFiltersInput>;
  requiredStock4?: InputMaybe<StockFiltersInput>;
  resetType?: InputMaybe<StringFilterInput>;
  resetValue?: InputMaybe<IntFilterInput>;
  rewardAmount?: InputMaybe<IntFilterInput>;
  rewardCategory?: InputMaybe<StringFilterInput>;
  rewardId?: InputMaybe<IntFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ExchangeItemInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  exchange?: InputMaybe<Scalars['ID']>;
  exchangeCount?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  recommend?: InputMaybe<Scalars['Boolean']>;
  requiredAmount1?: InputMaybe<Scalars['Int']>;
  requiredAmount2?: InputMaybe<Scalars['Int']>;
  requiredAmount3?: InputMaybe<Scalars['Int']>;
  requiredAmount4?: InputMaybe<Scalars['Int']>;
  requiredStock1?: InputMaybe<Scalars['ID']>;
  requiredStock2?: InputMaybe<Scalars['ID']>;
  requiredStock3?: InputMaybe<Scalars['ID']>;
  requiredStock4?: InputMaybe<Scalars['ID']>;
  resetType?: InputMaybe<Scalars['String']>;
  resetValue?: InputMaybe<Scalars['Int']>;
  rewardAmount?: InputMaybe<Scalars['Int']>;
  rewardCategory?: InputMaybe<Enum_Exchangeitem_Rewardcategory>;
  rewardId?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type ExchangeItemRelationResponseCollection = {
  __typename?: 'ExchangeItemRelationResponseCollection';
  data: Array<ExchangeItemEntity>;
};

export type ExchangeRelationResponseCollection = {
  __typename?: 'ExchangeRelationResponseCollection';
  data: Array<ExchangeEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type Gacha = {
  __typename?: 'Gacha';
  ascendingSortId?: Maybe<Scalars['Int']>;
  bonusStockId?: Maybe<Scalars['Int']>;
  category?: Maybe<Enum_Gacha_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  detail?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  gachaCardAttribute?: Maybe<Scalars['Int']>;
  hasPickUpDuplicateBonus?: Maybe<Scalars['Boolean']>;
  hasSpecificBg?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<GachaRelationResponseCollection>;
  loginTriggerMinutes?: Maybe<Scalars['Int']>;
  masterID?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  otherCardDate?: Maybe<Scalars['DateTime']>;
  pickUpCards?: Maybe<CardRelationResponseCollection>;
  pickUpLevelMax?: Maybe<Scalars['Boolean']>;
  selectBonusMaxValue?: Maybe<Scalars['Int']>;
  showHomeAnimation?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['DateTime']>;
  stepLoopCount?: Maybe<Scalars['Int']>;
  summary?: Maybe<Scalars['String']>;
  tableIds?: Maybe<Scalars['JSON']>;
  tableRates?: Maybe<Scalars['JSON']>;
  type?: Maybe<Enum_Gacha_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type GachaLocalizationsArgs = {
  filters?: InputMaybe<GachaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type GachaPickUpCardsArgs = {
  filters?: InputMaybe<CardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GachaEntity = {
  __typename?: 'GachaEntity';
  attributes?: Maybe<Gacha>;
  id?: Maybe<Scalars['ID']>;
};

export type GachaEntityResponse = {
  __typename?: 'GachaEntityResponse';
  data?: Maybe<GachaEntity>;
};

export type GachaEntityResponseCollection = {
  __typename?: 'GachaEntityResponseCollection';
  data: Array<GachaEntity>;
  meta: ResponseCollectionMeta;
};

export type GachaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GachaFiltersInput>>>;
  ascendingSortId?: InputMaybe<IntFilterInput>;
  bonusStockId?: InputMaybe<IntFilterInput>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  detail?: InputMaybe<StringFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  gachaCardAttribute?: InputMaybe<IntFilterInput>;
  hasPickUpDuplicateBonus?: InputMaybe<BooleanFilterInput>;
  hasSpecificBg?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<GachaFiltersInput>;
  loginTriggerMinutes?: InputMaybe<IntFilterInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<GachaFiltersInput>;
  note?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<GachaFiltersInput>>>;
  otherCardDate?: InputMaybe<DateTimeFilterInput>;
  pickUpCards?: InputMaybe<CardFiltersInput>;
  pickUpLevelMax?: InputMaybe<BooleanFilterInput>;
  selectBonusMaxValue?: InputMaybe<IntFilterInput>;
  showHomeAnimation?: InputMaybe<BooleanFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  stepLoopCount?: InputMaybe<IntFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
  tableIds?: InputMaybe<JsonFilterInput>;
  tableRates?: InputMaybe<JsonFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GachaInput = {
  ascendingSortId?: InputMaybe<Scalars['Int']>;
  bonusStockId?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Enum_Gacha_Category>;
  detail?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  gachaCardAttribute?: InputMaybe<Scalars['Int']>;
  hasPickUpDuplicateBonus?: InputMaybe<Scalars['Boolean']>;
  hasSpecificBg?: InputMaybe<Scalars['Boolean']>;
  loginTriggerMinutes?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  note?: InputMaybe<Scalars['String']>;
  otherCardDate?: InputMaybe<Scalars['DateTime']>;
  pickUpCards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  pickUpLevelMax?: InputMaybe<Scalars['Boolean']>;
  selectBonusMaxValue?: InputMaybe<Scalars['Int']>;
  showHomeAnimation?: InputMaybe<Scalars['Boolean']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  stepLoopCount?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['String']>;
  tableIds?: InputMaybe<Scalars['JSON']>;
  tableRates?: InputMaybe<Scalars['JSON']>;
  type?: InputMaybe<Enum_Gacha_Type>;
};

export type GachaRelationResponseCollection = {
  __typename?: 'GachaRelationResponseCollection';
  data: Array<GachaEntity>;
};

export type GenericMorph = AssistOptionPreset | Attribute | Card | Character | Chart | ChartAchieve | ChartDesigner | ClubItem | ClubItemDetail | ClubItemSpot | ComponentCharacterCharacters | ComponentCharacterMaxParameters | ComponentEpisodeCharacterEpisode | ComponentEpisodeEvent | ComponentEpisodeUnitEpisode | ComponentGameCondition | ComponentGameLoginBonusItem | ComponentGameRandomStock | ComponentMusicChartNoteCount | ComponentMusicMusicMix | ComponentMusicTrends | Episode | Event | EventAggregationBase | EventMedleySetlist | EventPointReward | EventRankingReward | EventSpecificBonus | Exchange | ExchangeItem | Gacha | Honor | I18NLocale | Live2DUiChat | LiveResultEpisode | LoginBonus | MissionDetail | MissionGroup | MissionPanel | Music | OptionPreset | ParameterBonus | PassiveSkill | PassiveSkillDescription | PassiveSkillExp | QuestBlock | QuestClubDeck | QuestDeck | QuestMap | Rarity | Reward | Skill | Stamp | Stock | StockViewCategory | Unit | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type Honor = {
  __typename?: 'Honor';
  conditionCardId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  duplicateStockAmounts?: Maybe<Scalars['JSON']>;
  duplicateStockIds?: Maybe<Scalars['JSON']>;
  effectType?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<HonorRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Honor_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type HonorLocalizationsArgs = {
  filters?: InputMaybe<HonorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type HonorEntity = {
  __typename?: 'HonorEntity';
  attributes?: Maybe<Honor>;
  id?: Maybe<Scalars['ID']>;
};

export type HonorEntityResponse = {
  __typename?: 'HonorEntityResponse';
  data?: Maybe<HonorEntity>;
};

export type HonorEntityResponseCollection = {
  __typename?: 'HonorEntityResponseCollection';
  data: Array<HonorEntity>;
  meta: ResponseCollectionMeta;
};

export type HonorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HonorFiltersInput>>>;
  conditionCardId?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  duplicateStockAmounts?: InputMaybe<JsonFilterInput>;
  duplicateStockIds?: InputMaybe<JsonFilterInput>;
  effectType?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<HonorFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<HonorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HonorFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HonorInput = {
  conditionCardId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  duplicateStockAmounts?: InputMaybe<Scalars['JSON']>;
  duplicateStockIds?: InputMaybe<Scalars['JSON']>;
  effectType?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Honor_Type>;
};

export type HonorRelationResponseCollection = {
  __typename?: 'HonorRelationResponseCollection';
  data: Array<HonorEntity>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Live2DUiChat = {
  __typename?: 'Live2DUiChat';
  categories?: Maybe<Scalars['JSON']>;
  character?: Maybe<CharacterEntityResponse>;
  clothId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Live2DUiChatRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  motion?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type Live2DUiChatLocalizationsArgs = {
  filters?: InputMaybe<Live2DUiChatFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Live2DUiChatEntity = {
  __typename?: 'Live2DUiChatEntity';
  attributes?: Maybe<Live2DUiChat>;
  id?: Maybe<Scalars['ID']>;
};

export type Live2DUiChatEntityResponse = {
  __typename?: 'Live2DUiChatEntityResponse';
  data?: Maybe<Live2DUiChatEntity>;
};

export type Live2DUiChatEntityResponseCollection = {
  __typename?: 'Live2DUiChatEntityResponseCollection';
  data: Array<Live2DUiChatEntity>;
  meta: ResponseCollectionMeta;
};

export type Live2DUiChatFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<Live2DUiChatFiltersInput>>>;
  categories?: InputMaybe<JsonFilterInput>;
  character?: InputMaybe<CharacterFiltersInput>;
  clothId?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<Live2DUiChatFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  message?: InputMaybe<StringFilterInput>;
  motion?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<Live2DUiChatFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<Live2DUiChatFiltersInput>>>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type Live2DUiChatInput = {
  categories?: InputMaybe<Scalars['JSON']>;
  character?: InputMaybe<Scalars['ID']>;
  clothId?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  masterID?: InputMaybe<Scalars['Int']>;
  message?: InputMaybe<Scalars['String']>;
  motion?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type Live2DUiChatRelationResponseCollection = {
  __typename?: 'Live2DUiChatRelationResponseCollection';
  data: Array<Live2DUiChatEntity>;
};

export type LiveResultEpisode = {
  __typename?: 'LiveResultEpisode';
  characters?: Maybe<CharacterRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  episode?: Maybe<EpisodeEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<LiveResultEpisodeRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type LiveResultEpisodeCharactersArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type LiveResultEpisodeLocalizationsArgs = {
  filters?: InputMaybe<LiveResultEpisodeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type LiveResultEpisodeEntity = {
  __typename?: 'LiveResultEpisodeEntity';
  attributes?: Maybe<LiveResultEpisode>;
  id?: Maybe<Scalars['ID']>;
};

export type LiveResultEpisodeEntityResponse = {
  __typename?: 'LiveResultEpisodeEntityResponse';
  data?: Maybe<LiveResultEpisodeEntity>;
};

export type LiveResultEpisodeEntityResponseCollection = {
  __typename?: 'LiveResultEpisodeEntityResponseCollection';
  data: Array<LiveResultEpisodeEntity>;
  meta: ResponseCollectionMeta;
};

export type LiveResultEpisodeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LiveResultEpisodeFiltersInput>>>;
  characters?: InputMaybe<CharacterFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  episode?: InputMaybe<EpisodeFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<LiveResultEpisodeFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<LiveResultEpisodeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LiveResultEpisodeFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LiveResultEpisodeInput = {
  characters?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  episode?: InputMaybe<Scalars['ID']>;
  masterID?: InputMaybe<Scalars['Int']>;
};

export type LiveResultEpisodeRelationResponseCollection = {
  __typename?: 'LiveResultEpisodeRelationResponseCollection';
  data: Array<LiveResultEpisodeEntity>;
};

export type LoginBonus = {
  __typename?: 'LoginBonus';
  backgroundImage?: Maybe<Scalars['String']>;
  comebackDays?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  datePositions?: Maybe<Scalars['JSON']>;
  endDate?: Maybe<Scalars['DateTime']>;
  foregroundImage?: Maybe<Scalars['String']>;
  limitDays?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<LoginBonusRelationResponseCollection>;
  loginBonusItems?: Maybe<Array<Maybe<ComponentGameLoginBonusItem>>>;
  loop?: Maybe<Scalars['Boolean']>;
  masterID?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  subscriptionId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Loginbonus_Type>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type LoginBonusLocalizationsArgs = {
  filters?: InputMaybe<LoginBonusFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type LoginBonusLoginBonusItemsArgs = {
  filters?: InputMaybe<ComponentGameLoginBonusItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type LoginBonusEntity = {
  __typename?: 'LoginBonusEntity';
  attributes?: Maybe<LoginBonus>;
  id?: Maybe<Scalars['ID']>;
};

export type LoginBonusEntityResponse = {
  __typename?: 'LoginBonusEntityResponse';
  data?: Maybe<LoginBonusEntity>;
};

export type LoginBonusEntityResponseCollection = {
  __typename?: 'LoginBonusEntityResponseCollection';
  data: Array<LoginBonusEntity>;
  meta: ResponseCollectionMeta;
};

export type LoginBonusFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LoginBonusFiltersInput>>>;
  backgroundImage?: InputMaybe<StringFilterInput>;
  comebackDays?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  datePositions?: InputMaybe<JsonFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  foregroundImage?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  limitDays?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<LoginBonusFiltersInput>;
  loop?: InputMaybe<BooleanFilterInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<LoginBonusFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LoginBonusFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  subscriptionId?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LoginBonusInput = {
  backgroundImage?: InputMaybe<Scalars['String']>;
  comebackDays?: InputMaybe<Scalars['Int']>;
  datePositions?: InputMaybe<Scalars['JSON']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  foregroundImage?: InputMaybe<Scalars['String']>;
  limitDays?: InputMaybe<Scalars['Int']>;
  loginBonusItems?: InputMaybe<Array<InputMaybe<ComponentGameLoginBonusItemInput>>>;
  loop?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  subscriptionId?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Loginbonus_Type>;
};

export type LoginBonusRelationResponseCollection = {
  __typename?: 'LoginBonusRelationResponseCollection';
  data: Array<LoginBonusEntity>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  contains?: InputMaybe<Scalars['Long']>;
  containsi?: InputMaybe<Scalars['Long']>;
  endsWith?: InputMaybe<Scalars['Long']>;
  eq?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  ne?: InputMaybe<Scalars['Long']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']>;
  notContainsi?: InputMaybe<Scalars['Long']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  startsWith?: InputMaybe<Scalars['Long']>;
};

export type MissionDetail = {
  __typename?: 'MissionDetail';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  homePriority?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<MissionDetailRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  notifyType?: Maybe<Scalars['String']>;
  rewards?: Maybe<RewardRelationResponseCollection>;
  sequence?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MissionDetailLocalizationsArgs = {
  filters?: InputMaybe<MissionDetailFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MissionDetailRewardsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MissionDetailEntity = {
  __typename?: 'MissionDetailEntity';
  attributes?: Maybe<MissionDetail>;
  id?: Maybe<Scalars['ID']>;
};

export type MissionDetailEntityResponse = {
  __typename?: 'MissionDetailEntityResponse';
  data?: Maybe<MissionDetailEntity>;
};

export type MissionDetailEntityResponseCollection = {
  __typename?: 'MissionDetailEntityResponseCollection';
  data: Array<MissionDetailEntity>;
  meta: ResponseCollectionMeta;
};

export type MissionDetailFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MissionDetailFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  homePriority?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<MissionDetailFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<MissionDetailFiltersInput>;
  notifyType?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<MissionDetailFiltersInput>>>;
  rewards?: InputMaybe<RewardFiltersInput>;
  sequence?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MissionDetailInput = {
  description?: InputMaybe<Scalars['String']>;
  homePriority?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  notifyType?: InputMaybe<Scalars['String']>;
  rewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sequence?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type MissionDetailRelationResponseCollection = {
  __typename?: 'MissionDetailRelationResponseCollection';
  data: Array<MissionDetailEntity>;
};

export type MissionGroup = {
  __typename?: 'MissionGroup';
  category?: Maybe<Enum_Missiongroup_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<MissionGroupRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  panels?: Maybe<MissionPanelRelationResponseCollection>;
  resetType?: Maybe<Scalars['String']>;
  resetValue?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  subscriptionId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MissionGroupLocalizationsArgs = {
  filters?: InputMaybe<MissionGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MissionGroupPanelsArgs = {
  filters?: InputMaybe<MissionPanelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MissionGroupEntity = {
  __typename?: 'MissionGroupEntity';
  attributes?: Maybe<MissionGroup>;
  id?: Maybe<Scalars['ID']>;
};

export type MissionGroupEntityResponse = {
  __typename?: 'MissionGroupEntityResponse';
  data?: Maybe<MissionGroupEntity>;
};

export type MissionGroupEntityResponseCollection = {
  __typename?: 'MissionGroupEntityResponseCollection';
  data: Array<MissionGroupEntity>;
  meta: ResponseCollectionMeta;
};

export type MissionGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MissionGroupFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<MissionGroupFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<MissionGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MissionGroupFiltersInput>>>;
  panels?: InputMaybe<MissionPanelFiltersInput>;
  resetType?: InputMaybe<StringFilterInput>;
  resetValue?: InputMaybe<IntFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  subscriptionId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MissionGroupInput = {
  category?: InputMaybe<Enum_Missiongroup_Category>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  masterID?: InputMaybe<Scalars['Int']>;
  panels?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  resetType?: InputMaybe<Scalars['String']>;
  resetValue?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  subscriptionId?: InputMaybe<Scalars['Int']>;
};

export type MissionGroupRelationResponseCollection = {
  __typename?: 'MissionGroupRelationResponseCollection';
  data: Array<MissionGroupEntity>;
};

export type MissionPanel = {
  __typename?: 'MissionPanel';
  allCompleteRewards?: Maybe<RewardRelationResponseCollection>;
  bannerGroup?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  group?: Maybe<MissionGroupEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<MissionPanelRelationResponseCollection>;
  masterId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  step?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MissionPanelAllCompleteRewardsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MissionPanelLocalizationsArgs = {
  filters?: InputMaybe<MissionPanelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MissionPanelEntity = {
  __typename?: 'MissionPanelEntity';
  attributes?: Maybe<MissionPanel>;
  id?: Maybe<Scalars['ID']>;
};

export type MissionPanelEntityResponse = {
  __typename?: 'MissionPanelEntityResponse';
  data?: Maybe<MissionPanelEntity>;
};

export type MissionPanelEntityResponseCollection = {
  __typename?: 'MissionPanelEntityResponseCollection';
  data: Array<MissionPanelEntity>;
  meta: ResponseCollectionMeta;
};

export type MissionPanelFiltersInput = {
  allCompleteRewards?: InputMaybe<RewardFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<MissionPanelFiltersInput>>>;
  bannerGroup?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  group?: InputMaybe<MissionGroupFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<MissionPanelFiltersInput>;
  masterId?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MissionPanelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MissionPanelFiltersInput>>>;
  step?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MissionPanelInput = {
  allCompleteRewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  bannerGroup?: InputMaybe<Scalars['Int']>;
  group?: InputMaybe<Scalars['ID']>;
  masterId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  step?: InputMaybe<Scalars['Int']>;
};

export type MissionPanelRelationResponseCollection = {
  __typename?: 'MissionPanelRelationResponseCollection';
  data: Array<MissionPanelEntity>;
};

export type Music = {
  __typename?: 'Music';
  arranger?: Maybe<Scalars['String']>;
  canFairUse?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Enum_Music_Category>;
  charts?: Maybe<ChartRelationResponseCollection>;
  composer?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultOrder?: Maybe<Scalars['Int']>;
  endDate?: Maybe<Scalars['DateTime']>;
  excludeChallenge?: Maybe<Scalars['Boolean']>;
  hasMovie?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<MusicRelationResponseCollection>;
  lyrist?: Maybe<Scalars['String']>;
  masterID?: Maybe<Scalars['Int']>;
  musicBpm?: Maybe<Scalars['Float']>;
  musicMix?: Maybe<Array<Maybe<ComponentMusicMusicMix>>>;
  name?: Maybe<Scalars['String']>;
  openKey?: Maybe<Scalars['Int']>;
  purchaseBonuses?: Maybe<Scalars['JSON']>;
  readName?: Maybe<Scalars['String']>;
  specialUnitName?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  unit?: Maybe<UnitEntityResponse>;
  unused?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type MusicChartsArgs = {
  filters?: InputMaybe<ChartFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MusicLocalizationsArgs = {
  filters?: InputMaybe<MusicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MusicMusicMixArgs = {
  filters?: InputMaybe<ComponentMusicMusicMixFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MusicEntity = {
  __typename?: 'MusicEntity';
  attributes?: Maybe<Music>;
  id?: Maybe<Scalars['ID']>;
};

export type MusicEntityResponse = {
  __typename?: 'MusicEntityResponse';
  data?: Maybe<MusicEntity>;
};

export type MusicEntityResponseCollection = {
  __typename?: 'MusicEntityResponseCollection';
  data: Array<MusicEntity>;
  meta: ResponseCollectionMeta;
};

export type MusicFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MusicFiltersInput>>>;
  arranger?: InputMaybe<StringFilterInput>;
  canFairUse?: InputMaybe<BooleanFilterInput>;
  category?: InputMaybe<StringFilterInput>;
  charts?: InputMaybe<ChartFiltersInput>;
  composer?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  defaultOrder?: InputMaybe<IntFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  excludeChallenge?: InputMaybe<BooleanFilterInput>;
  hasMovie?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isHidden?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<MusicFiltersInput>;
  lyrist?: InputMaybe<StringFilterInput>;
  masterID?: InputMaybe<IntFilterInput>;
  musicBpm?: InputMaybe<FloatFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MusicFiltersInput>;
  openKey?: InputMaybe<IntFilterInput>;
  or?: InputMaybe<Array<InputMaybe<MusicFiltersInput>>>;
  purchaseBonuses?: InputMaybe<JsonFilterInput>;
  readName?: InputMaybe<StringFilterInput>;
  specialUnitName?: InputMaybe<StringFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  unit?: InputMaybe<UnitFiltersInput>;
  unused?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MusicInput = {
  arranger?: InputMaybe<Scalars['String']>;
  canFairUse?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<Enum_Music_Category>;
  charts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  composer?: InputMaybe<Scalars['String']>;
  defaultOrder?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  excludeChallenge?: InputMaybe<Scalars['Boolean']>;
  hasMovie?: InputMaybe<Scalars['Boolean']>;
  isHidden?: InputMaybe<Scalars['Boolean']>;
  lyrist?: InputMaybe<Scalars['String']>;
  masterID?: InputMaybe<Scalars['Int']>;
  musicBpm?: InputMaybe<Scalars['Float']>;
  musicMix?: InputMaybe<Array<InputMaybe<ComponentMusicMusicMixInput>>>;
  name?: InputMaybe<Scalars['String']>;
  openKey?: InputMaybe<Scalars['Int']>;
  purchaseBonuses?: InputMaybe<Scalars['JSON']>;
  readName?: InputMaybe<Scalars['String']>;
  specialUnitName?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  unit?: InputMaybe<Scalars['ID']>;
  unused?: InputMaybe<Scalars['Boolean']>;
};

export type MusicRelationResponseCollection = {
  __typename?: 'MusicRelationResponseCollection';
  data: Array<MusicEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAssistOptionPreset?: Maybe<AssistOptionPresetEntityResponse>;
  createAssistOptionPresetLocalization?: Maybe<AssistOptionPresetEntityResponse>;
  createAttribute?: Maybe<AttributeEntityResponse>;
  createAttributeLocalization?: Maybe<AttributeEntityResponse>;
  createCard?: Maybe<CardEntityResponse>;
  createCardLocalization?: Maybe<CardEntityResponse>;
  createCharacter?: Maybe<CharacterEntityResponse>;
  createCharacterLocalization?: Maybe<CharacterEntityResponse>;
  createChart?: Maybe<ChartEntityResponse>;
  createChartAchieve?: Maybe<ChartAchieveEntityResponse>;
  createChartAchieveLocalization?: Maybe<ChartAchieveEntityResponse>;
  createChartDesigner?: Maybe<ChartDesignerEntityResponse>;
  createChartDesignerLocalization?: Maybe<ChartDesignerEntityResponse>;
  createChartLocalization?: Maybe<ChartEntityResponse>;
  createClubItem?: Maybe<ClubItemEntityResponse>;
  createClubItemDetail?: Maybe<ClubItemDetailEntityResponse>;
  createClubItemDetailLocalization?: Maybe<ClubItemDetailEntityResponse>;
  createClubItemLocalization?: Maybe<ClubItemEntityResponse>;
  createClubItemSpot?: Maybe<ClubItemSpotEntityResponse>;
  createClubItemSpotLocalization?: Maybe<ClubItemSpotEntityResponse>;
  createEpisode?: Maybe<EpisodeEntityResponse>;
  createEpisodeLocalization?: Maybe<EpisodeEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  createEventAggregationBase?: Maybe<EventAggregationBaseEntityResponse>;
  createEventAggregationBaseLocalization?: Maybe<EventAggregationBaseEntityResponse>;
  createEventLocalization?: Maybe<EventEntityResponse>;
  createEventMedleySetlist?: Maybe<EventMedleySetlistEntityResponse>;
  createEventMedleySetlistLocalization?: Maybe<EventMedleySetlistEntityResponse>;
  createEventPointReward?: Maybe<EventPointRewardEntityResponse>;
  createEventPointRewardLocalization?: Maybe<EventPointRewardEntityResponse>;
  createEventRankingReward?: Maybe<EventRankingRewardEntityResponse>;
  createEventRankingRewardLocalization?: Maybe<EventRankingRewardEntityResponse>;
  createEventSpecificBonus?: Maybe<EventSpecificBonusEntityResponse>;
  createEventSpecificBonusLocalization?: Maybe<EventSpecificBonusEntityResponse>;
  createExchange?: Maybe<ExchangeEntityResponse>;
  createExchangeItem?: Maybe<ExchangeItemEntityResponse>;
  createExchangeItemLocalization?: Maybe<ExchangeItemEntityResponse>;
  createExchangeLocalization?: Maybe<ExchangeEntityResponse>;
  createGacha?: Maybe<GachaEntityResponse>;
  createGachaLocalization?: Maybe<GachaEntityResponse>;
  createHonor?: Maybe<HonorEntityResponse>;
  createHonorLocalization?: Maybe<HonorEntityResponse>;
  createLive2DUiChat?: Maybe<Live2DUiChatEntityResponse>;
  createLive2DUiChatLocalization?: Maybe<Live2DUiChatEntityResponse>;
  createLiveResultEpisode?: Maybe<LiveResultEpisodeEntityResponse>;
  createLiveResultEpisodeLocalization?: Maybe<LiveResultEpisodeEntityResponse>;
  createLoginBonus?: Maybe<LoginBonusEntityResponse>;
  createLoginBonusLocalization?: Maybe<LoginBonusEntityResponse>;
  createMissionDetail?: Maybe<MissionDetailEntityResponse>;
  createMissionDetailLocalization?: Maybe<MissionDetailEntityResponse>;
  createMissionGroup?: Maybe<MissionGroupEntityResponse>;
  createMissionGroupLocalization?: Maybe<MissionGroupEntityResponse>;
  createMissionPanel?: Maybe<MissionPanelEntityResponse>;
  createMissionPanelLocalization?: Maybe<MissionPanelEntityResponse>;
  createMusic?: Maybe<MusicEntityResponse>;
  createMusicLocalization?: Maybe<MusicEntityResponse>;
  createOptionPreset?: Maybe<OptionPresetEntityResponse>;
  createOptionPresetLocalization?: Maybe<OptionPresetEntityResponse>;
  createParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  createParameterBonusLocalization?: Maybe<ParameterBonusEntityResponse>;
  createPassiveSkill?: Maybe<PassiveSkillEntityResponse>;
  createPassiveSkillDescription?: Maybe<PassiveSkillDescriptionEntityResponse>;
  createPassiveSkillDescriptionLocalization?: Maybe<PassiveSkillDescriptionEntityResponse>;
  createPassiveSkillExp?: Maybe<PassiveSkillExpEntityResponse>;
  createPassiveSkillExpLocalization?: Maybe<PassiveSkillExpEntityResponse>;
  createPassiveSkillLocalization?: Maybe<PassiveSkillEntityResponse>;
  createQuestBlock?: Maybe<QuestBlockEntityResponse>;
  createQuestBlockLocalization?: Maybe<QuestBlockEntityResponse>;
  createQuestClubDeck?: Maybe<QuestClubDeckEntityResponse>;
  createQuestClubDeckLocalization?: Maybe<QuestClubDeckEntityResponse>;
  createQuestDeck?: Maybe<QuestDeckEntityResponse>;
  createQuestDeckLocalization?: Maybe<QuestDeckEntityResponse>;
  createQuestMap?: Maybe<QuestMapEntityResponse>;
  createQuestMapLocalization?: Maybe<QuestMapEntityResponse>;
  createRarity?: Maybe<RarityEntityResponse>;
  createRarityLocalization?: Maybe<RarityEntityResponse>;
  createReward?: Maybe<RewardEntityResponse>;
  createRewardLocalization?: Maybe<RewardEntityResponse>;
  createSkill?: Maybe<SkillEntityResponse>;
  createSkillLocalization?: Maybe<SkillEntityResponse>;
  createStamp?: Maybe<StampEntityResponse>;
  createStampLocalization?: Maybe<StampEntityResponse>;
  createStock?: Maybe<StockEntityResponse>;
  createStockLocalization?: Maybe<StockEntityResponse>;
  createStockViewCategory?: Maybe<StockViewCategoryEntityResponse>;
  createStockViewCategoryLocalization?: Maybe<StockViewCategoryEntityResponse>;
  createUnit?: Maybe<UnitEntityResponse>;
  createUnitLocalization?: Maybe<UnitEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAssistOptionPreset?: Maybe<AssistOptionPresetEntityResponse>;
  deleteAttribute?: Maybe<AttributeEntityResponse>;
  deleteCard?: Maybe<CardEntityResponse>;
  deleteCharacter?: Maybe<CharacterEntityResponse>;
  deleteChart?: Maybe<ChartEntityResponse>;
  deleteChartAchieve?: Maybe<ChartAchieveEntityResponse>;
  deleteChartDesigner?: Maybe<ChartDesignerEntityResponse>;
  deleteClubItem?: Maybe<ClubItemEntityResponse>;
  deleteClubItemDetail?: Maybe<ClubItemDetailEntityResponse>;
  deleteClubItemSpot?: Maybe<ClubItemSpotEntityResponse>;
  deleteEpisode?: Maybe<EpisodeEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deleteEventAggregationBase?: Maybe<EventAggregationBaseEntityResponse>;
  deleteEventMedleySetlist?: Maybe<EventMedleySetlistEntityResponse>;
  deleteEventPointReward?: Maybe<EventPointRewardEntityResponse>;
  deleteEventRankingReward?: Maybe<EventRankingRewardEntityResponse>;
  deleteEventSpecificBonus?: Maybe<EventSpecificBonusEntityResponse>;
  deleteExchange?: Maybe<ExchangeEntityResponse>;
  deleteExchangeItem?: Maybe<ExchangeItemEntityResponse>;
  deleteGacha?: Maybe<GachaEntityResponse>;
  deleteHonor?: Maybe<HonorEntityResponse>;
  deleteLive2DUiChat?: Maybe<Live2DUiChatEntityResponse>;
  deleteLiveResultEpisode?: Maybe<LiveResultEpisodeEntityResponse>;
  deleteLoginBonus?: Maybe<LoginBonusEntityResponse>;
  deleteMissionDetail?: Maybe<MissionDetailEntityResponse>;
  deleteMissionGroup?: Maybe<MissionGroupEntityResponse>;
  deleteMissionPanel?: Maybe<MissionPanelEntityResponse>;
  deleteMusic?: Maybe<MusicEntityResponse>;
  deleteOptionPreset?: Maybe<OptionPresetEntityResponse>;
  deleteParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  deletePassiveSkill?: Maybe<PassiveSkillEntityResponse>;
  deletePassiveSkillDescription?: Maybe<PassiveSkillDescriptionEntityResponse>;
  deletePassiveSkillExp?: Maybe<PassiveSkillExpEntityResponse>;
  deleteQuestBlock?: Maybe<QuestBlockEntityResponse>;
  deleteQuestClubDeck?: Maybe<QuestClubDeckEntityResponse>;
  deleteQuestDeck?: Maybe<QuestDeckEntityResponse>;
  deleteQuestMap?: Maybe<QuestMapEntityResponse>;
  deleteRarity?: Maybe<RarityEntityResponse>;
  deleteReward?: Maybe<RewardEntityResponse>;
  deleteSkill?: Maybe<SkillEntityResponse>;
  deleteStamp?: Maybe<StampEntityResponse>;
  deleteStock?: Maybe<StockEntityResponse>;
  deleteStockViewCategory?: Maybe<StockViewCategoryEntityResponse>;
  deleteUnit?: Maybe<UnitEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAssistOptionPreset?: Maybe<AssistOptionPresetEntityResponse>;
  updateAttribute?: Maybe<AttributeEntityResponse>;
  updateCard?: Maybe<CardEntityResponse>;
  updateCharacter?: Maybe<CharacterEntityResponse>;
  updateChart?: Maybe<ChartEntityResponse>;
  updateChartAchieve?: Maybe<ChartAchieveEntityResponse>;
  updateChartDesigner?: Maybe<ChartDesignerEntityResponse>;
  updateClubItem?: Maybe<ClubItemEntityResponse>;
  updateClubItemDetail?: Maybe<ClubItemDetailEntityResponse>;
  updateClubItemSpot?: Maybe<ClubItemSpotEntityResponse>;
  updateEpisode?: Maybe<EpisodeEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  updateEventAggregationBase?: Maybe<EventAggregationBaseEntityResponse>;
  updateEventMedleySetlist?: Maybe<EventMedleySetlistEntityResponse>;
  updateEventPointReward?: Maybe<EventPointRewardEntityResponse>;
  updateEventRankingReward?: Maybe<EventRankingRewardEntityResponse>;
  updateEventSpecificBonus?: Maybe<EventSpecificBonusEntityResponse>;
  updateExchange?: Maybe<ExchangeEntityResponse>;
  updateExchangeItem?: Maybe<ExchangeItemEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateGacha?: Maybe<GachaEntityResponse>;
  updateHonor?: Maybe<HonorEntityResponse>;
  updateLive2DUiChat?: Maybe<Live2DUiChatEntityResponse>;
  updateLiveResultEpisode?: Maybe<LiveResultEpisodeEntityResponse>;
  updateLoginBonus?: Maybe<LoginBonusEntityResponse>;
  updateMissionDetail?: Maybe<MissionDetailEntityResponse>;
  updateMissionGroup?: Maybe<MissionGroupEntityResponse>;
  updateMissionPanel?: Maybe<MissionPanelEntityResponse>;
  updateMusic?: Maybe<MusicEntityResponse>;
  updateOptionPreset?: Maybe<OptionPresetEntityResponse>;
  updateParameterBonus?: Maybe<ParameterBonusEntityResponse>;
  updatePassiveSkill?: Maybe<PassiveSkillEntityResponse>;
  updatePassiveSkillDescription?: Maybe<PassiveSkillDescriptionEntityResponse>;
  updatePassiveSkillExp?: Maybe<PassiveSkillExpEntityResponse>;
  updateQuestBlock?: Maybe<QuestBlockEntityResponse>;
  updateQuestClubDeck?: Maybe<QuestClubDeckEntityResponse>;
  updateQuestDeck?: Maybe<QuestDeckEntityResponse>;
  updateQuestMap?: Maybe<QuestMapEntityResponse>;
  updateRarity?: Maybe<RarityEntityResponse>;
  updateReward?: Maybe<RewardEntityResponse>;
  updateSkill?: Maybe<SkillEntityResponse>;
  updateStamp?: Maybe<StampEntityResponse>;
  updateStock?: Maybe<StockEntityResponse>;
  updateStockViewCategory?: Maybe<StockViewCategoryEntityResponse>;
  updateUnit?: Maybe<UnitEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationCreateAssistOptionPresetArgs = {
  data: AssistOptionPresetInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateAssistOptionPresetLocalizationArgs = {
  data?: InputMaybe<AssistOptionPresetInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateAttributeArgs = {
  data: AttributeInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateAttributeLocalizationArgs = {
  data?: InputMaybe<AttributeInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCardArgs = {
  data: CardInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCardLocalizationArgs = {
  data?: InputMaybe<CardInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCharacterArgs = {
  data: CharacterInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateCharacterLocalizationArgs = {
  data?: InputMaybe<CharacterInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateChartArgs = {
  data: ChartInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateChartAchieveArgs = {
  data: ChartAchieveInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateChartAchieveLocalizationArgs = {
  data?: InputMaybe<ChartAchieveInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateChartDesignerArgs = {
  data: ChartDesignerInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateChartDesignerLocalizationArgs = {
  data?: InputMaybe<ChartDesignerInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateChartLocalizationArgs = {
  data?: InputMaybe<ChartInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateClubItemArgs = {
  data: ClubItemInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateClubItemDetailArgs = {
  data: ClubItemDetailInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateClubItemDetailLocalizationArgs = {
  data?: InputMaybe<ClubItemDetailInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateClubItemLocalizationArgs = {
  data?: InputMaybe<ClubItemInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateClubItemSpotArgs = {
  data: ClubItemSpotInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateClubItemSpotLocalizationArgs = {
  data?: InputMaybe<ClubItemSpotInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEpisodeArgs = {
  data: EpisodeInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEpisodeLocalizationArgs = {
  data?: InputMaybe<EpisodeInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventArgs = {
  data: EventInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventAggregationBaseArgs = {
  data: EventAggregationBaseInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventAggregationBaseLocalizationArgs = {
  data?: InputMaybe<EventAggregationBaseInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventLocalizationArgs = {
  data?: InputMaybe<EventInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventMedleySetlistArgs = {
  data: EventMedleySetlistInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventMedleySetlistLocalizationArgs = {
  data?: InputMaybe<EventMedleySetlistInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventPointRewardArgs = {
  data: EventPointRewardInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventPointRewardLocalizationArgs = {
  data?: InputMaybe<EventPointRewardInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventRankingRewardArgs = {
  data: EventRankingRewardInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventRankingRewardLocalizationArgs = {
  data?: InputMaybe<EventRankingRewardInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventSpecificBonusArgs = {
  data: EventSpecificBonusInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEventSpecificBonusLocalizationArgs = {
  data?: InputMaybe<EventSpecificBonusInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateExchangeArgs = {
  data: ExchangeInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateExchangeItemArgs = {
  data: ExchangeItemInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateExchangeItemLocalizationArgs = {
  data?: InputMaybe<ExchangeItemInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateExchangeLocalizationArgs = {
  data?: InputMaybe<ExchangeInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateGachaArgs = {
  data: GachaInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateGachaLocalizationArgs = {
  data?: InputMaybe<GachaInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateHonorArgs = {
  data: HonorInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateHonorLocalizationArgs = {
  data?: InputMaybe<HonorInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateLive2DUiChatArgs = {
  data: Live2DUiChatInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateLive2DUiChatLocalizationArgs = {
  data?: InputMaybe<Live2DUiChatInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateLiveResultEpisodeArgs = {
  data: LiveResultEpisodeInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateLiveResultEpisodeLocalizationArgs = {
  data?: InputMaybe<LiveResultEpisodeInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateLoginBonusArgs = {
  data: LoginBonusInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateLoginBonusLocalizationArgs = {
  data?: InputMaybe<LoginBonusInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMissionDetailArgs = {
  data: MissionDetailInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMissionDetailLocalizationArgs = {
  data?: InputMaybe<MissionDetailInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMissionGroupArgs = {
  data: MissionGroupInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMissionGroupLocalizationArgs = {
  data?: InputMaybe<MissionGroupInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMissionPanelArgs = {
  data: MissionPanelInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMissionPanelLocalizationArgs = {
  data?: InputMaybe<MissionPanelInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMusicArgs = {
  data: MusicInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateMusicLocalizationArgs = {
  data?: InputMaybe<MusicInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateOptionPresetArgs = {
  data: OptionPresetInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateOptionPresetLocalizationArgs = {
  data?: InputMaybe<OptionPresetInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateParameterBonusArgs = {
  data: ParameterBonusInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateParameterBonusLocalizationArgs = {
  data?: InputMaybe<ParameterBonusInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePassiveSkillArgs = {
  data: PassiveSkillInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePassiveSkillDescriptionArgs = {
  data: PassiveSkillDescriptionInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePassiveSkillDescriptionLocalizationArgs = {
  data?: InputMaybe<PassiveSkillDescriptionInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePassiveSkillExpArgs = {
  data: PassiveSkillExpInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePassiveSkillExpLocalizationArgs = {
  data?: InputMaybe<PassiveSkillExpInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePassiveSkillLocalizationArgs = {
  data?: InputMaybe<PassiveSkillInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestBlockArgs = {
  data: QuestBlockInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestBlockLocalizationArgs = {
  data?: InputMaybe<QuestBlockInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestClubDeckArgs = {
  data: QuestClubDeckInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestClubDeckLocalizationArgs = {
  data?: InputMaybe<QuestClubDeckInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestDeckArgs = {
  data: QuestDeckInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestDeckLocalizationArgs = {
  data?: InputMaybe<QuestDeckInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestMapArgs = {
  data: QuestMapInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateQuestMapLocalizationArgs = {
  data?: InputMaybe<QuestMapInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateRarityArgs = {
  data: RarityInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateRarityLocalizationArgs = {
  data?: InputMaybe<RarityInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateRewardArgs = {
  data: RewardInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateRewardLocalizationArgs = {
  data?: InputMaybe<RewardInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateSkillArgs = {
  data: SkillInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateSkillLocalizationArgs = {
  data?: InputMaybe<SkillInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStampArgs = {
  data: StampInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStampLocalizationArgs = {
  data?: InputMaybe<StampInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStockArgs = {
  data: StockInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStockLocalizationArgs = {
  data?: InputMaybe<StockInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStockViewCategoryArgs = {
  data: StockViewCategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateStockViewCategoryLocalizationArgs = {
  data?: InputMaybe<StockViewCategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUnitArgs = {
  data: UnitInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUnitLocalizationArgs = {
  data?: InputMaybe<UnitInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteAssistOptionPresetArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteAttributeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteCardArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteCharacterArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteChartArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteChartAchieveArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteChartDesignerArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteClubItemArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteClubItemDetailArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteClubItemSpotArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEpisodeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventAggregationBaseArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventMedleySetlistArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventPointRewardArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventRankingRewardArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEventSpecificBonusArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteExchangeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteExchangeItemArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteGachaArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteHonorArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteLive2DUiChatArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteLiveResultEpisodeArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteLoginBonusArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteMissionDetailArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteMissionGroupArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteMissionPanelArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteMusicArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteOptionPresetArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteParameterBonusArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePassiveSkillArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePassiveSkillDescriptionArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePassiveSkillExpArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteQuestBlockArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteQuestClubDeckArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteQuestDeckArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteQuestMapArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteRarityArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteRewardArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteSkillArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteStampArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteStockArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteStockViewCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteUnitArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateAssistOptionPresetArgs = {
  data: AssistOptionPresetInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateAttributeArgs = {
  data: AttributeInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateCardArgs = {
  data: CardInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateCharacterArgs = {
  data: CharacterInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateChartArgs = {
  data: ChartInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateChartAchieveArgs = {
  data: ChartAchieveInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateChartDesignerArgs = {
  data: ChartDesignerInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateClubItemArgs = {
  data: ClubItemInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateClubItemDetailArgs = {
  data: ClubItemDetailInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateClubItemSpotArgs = {
  data: ClubItemSpotInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEpisodeArgs = {
  data: EpisodeInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventAggregationBaseArgs = {
  data: EventAggregationBaseInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventMedleySetlistArgs = {
  data: EventMedleySetlistInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventPointRewardArgs = {
  data: EventPointRewardInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventRankingRewardArgs = {
  data: EventRankingRewardInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEventSpecificBonusArgs = {
  data: EventSpecificBonusInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateExchangeArgs = {
  data: ExchangeInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateExchangeItemArgs = {
  data: ExchangeItemInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateGachaArgs = {
  data: GachaInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateHonorArgs = {
  data: HonorInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateLive2DUiChatArgs = {
  data: Live2DUiChatInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateLiveResultEpisodeArgs = {
  data: LiveResultEpisodeInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateLoginBonusArgs = {
  data: LoginBonusInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateMissionDetailArgs = {
  data: MissionDetailInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateMissionGroupArgs = {
  data: MissionGroupInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateMissionPanelArgs = {
  data: MissionPanelInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateMusicArgs = {
  data: MusicInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateOptionPresetArgs = {
  data: OptionPresetInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateParameterBonusArgs = {
  data: ParameterBonusInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePassiveSkillArgs = {
  data: PassiveSkillInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePassiveSkillDescriptionArgs = {
  data: PassiveSkillDescriptionInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePassiveSkillExpArgs = {
  data: PassiveSkillExpInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateQuestBlockArgs = {
  data: QuestBlockInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateQuestClubDeckArgs = {
  data: QuestClubDeckInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateQuestDeckArgs = {
  data: QuestDeckInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateQuestMapArgs = {
  data: QuestMapInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateRarityArgs = {
  data: RarityInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateRewardArgs = {
  data: RewardInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateSkillArgs = {
  data: SkillInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateStampArgs = {
  data: StampInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateStockArgs = {
  data: StockInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateStockViewCategoryArgs = {
  data: StockViewCategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateUnitArgs = {
  data: UnitInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type OptionPreset = {
  __typename?: 'OptionPreset';
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['String']>;
  dataDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isSelectable?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<OptionPresetRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type OptionPresetLocalizationsArgs = {
  filters?: InputMaybe<OptionPresetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OptionPresetEntity = {
  __typename?: 'OptionPresetEntity';
  attributes?: Maybe<OptionPreset>;
  id?: Maybe<Scalars['ID']>;
};

export type OptionPresetEntityResponse = {
  __typename?: 'OptionPresetEntityResponse';
  data?: Maybe<OptionPresetEntity>;
};

export type OptionPresetEntityResponseCollection = {
  __typename?: 'OptionPresetEntityResponseCollection';
  data: Array<OptionPresetEntity>;
  meta: ResponseCollectionMeta;
};

export type OptionPresetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OptionPresetFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  data?: InputMaybe<StringFilterInput>;
  dataDescription?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isSelectable?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OptionPresetFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<OptionPresetFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OptionPresetFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OptionPresetInput = {
  data?: InputMaybe<Scalars['String']>;
  dataDescription?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isSelectable?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type OptionPresetRelationResponseCollection = {
  __typename?: 'OptionPresetRelationResponseCollection';
  data: Array<OptionPresetEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type ParameterBonus = {
  __typename?: 'ParameterBonus';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<ParameterBonusRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  targetId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  value?: Maybe<Scalars['Int']>;
};


export type ParameterBonusLocalizationsArgs = {
  filters?: InputMaybe<ParameterBonusFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ParameterBonusEntity = {
  __typename?: 'ParameterBonusEntity';
  attributes?: Maybe<ParameterBonus>;
  id?: Maybe<Scalars['ID']>;
};

export type ParameterBonusEntityResponse = {
  __typename?: 'ParameterBonusEntityResponse';
  data?: Maybe<ParameterBonusEntity>;
};

export type ParameterBonusEntityResponseCollection = {
  __typename?: 'ParameterBonusEntityResponseCollection';
  data: Array<ParameterBonusEntity>;
  meta: ResponseCollectionMeta;
};

export type ParameterBonusFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ParameterBonusFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ParameterBonusFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ParameterBonusFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ParameterBonusFiltersInput>>>;
  targetId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  value?: InputMaybe<IntFilterInput>;
};

export type ParameterBonusInput = {
  masterID?: InputMaybe<Scalars['Int']>;
  targetId?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['Int']>;
};

export type ParameterBonusRelationResponseCollection = {
  __typename?: 'ParameterBonusRelationResponseCollection';
  data: Array<ParameterBonusEntity>;
};

export type PassiveSkill = {
  __typename?: 'PassiveSkill';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PassiveSkillRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  maxValue?: Maybe<Scalars['Float']>;
  minValue?: Maybe<Scalars['Float']>;
  subValue?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PassiveSkillLocalizationsArgs = {
  filters?: InputMaybe<PassiveSkillFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PassiveSkillDescription = {
  __typename?: 'PassiveSkillDescription';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PassiveSkillDescriptionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PassiveSkillDescriptionLocalizationsArgs = {
  filters?: InputMaybe<PassiveSkillDescriptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PassiveSkillDescriptionEntity = {
  __typename?: 'PassiveSkillDescriptionEntity';
  attributes?: Maybe<PassiveSkillDescription>;
  id?: Maybe<Scalars['ID']>;
};

export type PassiveSkillDescriptionEntityResponse = {
  __typename?: 'PassiveSkillDescriptionEntityResponse';
  data?: Maybe<PassiveSkillDescriptionEntity>;
};

export type PassiveSkillDescriptionEntityResponseCollection = {
  __typename?: 'PassiveSkillDescriptionEntityResponseCollection';
  data: Array<PassiveSkillDescriptionEntity>;
  meta: ResponseCollectionMeta;
};

export type PassiveSkillDescriptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PassiveSkillDescriptionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PassiveSkillDescriptionFiltersInput>;
  not?: InputMaybe<PassiveSkillDescriptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PassiveSkillDescriptionFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PassiveSkillDescriptionInput = {
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PassiveSkillDescriptionRelationResponseCollection = {
  __typename?: 'PassiveSkillDescriptionRelationResponseCollection';
  data: Array<PassiveSkillDescriptionEntity>;
};

export type PassiveSkillEntity = {
  __typename?: 'PassiveSkillEntity';
  attributes?: Maybe<PassiveSkill>;
  id?: Maybe<Scalars['ID']>;
};

export type PassiveSkillEntityResponse = {
  __typename?: 'PassiveSkillEntityResponse';
  data?: Maybe<PassiveSkillEntity>;
};

export type PassiveSkillEntityResponseCollection = {
  __typename?: 'PassiveSkillEntityResponseCollection';
  data: Array<PassiveSkillEntity>;
  meta: ResponseCollectionMeta;
};

export type PassiveSkillExp = {
  __typename?: 'PassiveSkillExp';
  createdAt?: Maybe<Scalars['DateTime']>;
  level?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PassiveSkillExpRelationResponseCollection>;
  rarity?: Maybe<Scalars['Int']>;
  totalExp?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PassiveSkillExpLocalizationsArgs = {
  filters?: InputMaybe<PassiveSkillExpFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PassiveSkillExpEntity = {
  __typename?: 'PassiveSkillExpEntity';
  attributes?: Maybe<PassiveSkillExp>;
  id?: Maybe<Scalars['ID']>;
};

export type PassiveSkillExpEntityResponse = {
  __typename?: 'PassiveSkillExpEntityResponse';
  data?: Maybe<PassiveSkillExpEntity>;
};

export type PassiveSkillExpEntityResponseCollection = {
  __typename?: 'PassiveSkillExpEntityResponseCollection';
  data: Array<PassiveSkillExpEntity>;
  meta: ResponseCollectionMeta;
};

export type PassiveSkillExpFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PassiveSkillExpFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  level?: InputMaybe<IntFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PassiveSkillExpFiltersInput>;
  not?: InputMaybe<PassiveSkillExpFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PassiveSkillExpFiltersInput>>>;
  rarity?: InputMaybe<IntFilterInput>;
  totalExp?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PassiveSkillExpInput = {
  level?: InputMaybe<Scalars['Int']>;
  rarity?: InputMaybe<Scalars['Int']>;
  totalExp?: InputMaybe<Scalars['Int']>;
};

export type PassiveSkillExpRelationResponseCollection = {
  __typename?: 'PassiveSkillExpRelationResponseCollection';
  data: Array<PassiveSkillExpEntity>;
};

export type PassiveSkillFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PassiveSkillFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PassiveSkillFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  maxValue?: InputMaybe<FloatFilterInput>;
  minValue?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<PassiveSkillFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PassiveSkillFiltersInput>>>;
  subValue?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PassiveSkillInput = {
  masterID?: InputMaybe<Scalars['Int']>;
  maxValue?: InputMaybe<Scalars['Float']>;
  minValue?: InputMaybe<Scalars['Float']>;
  subValue?: InputMaybe<Scalars['Float']>;
};

export type PassiveSkillRelationResponseCollection = {
  __typename?: 'PassiveSkillRelationResponseCollection';
  data: Array<PassiveSkillEntity>;
};

export type Query = {
  __typename?: 'Query';
  assistOptionPreset?: Maybe<AssistOptionPresetEntityResponse>;
  assistOptionPresets?: Maybe<AssistOptionPresetEntityResponseCollection>;
  attribute?: Maybe<AttributeEntityResponse>;
  attributes?: Maybe<AttributeEntityResponseCollection>;
  card?: Maybe<CardEntityResponse>;
  cards?: Maybe<CardEntityResponseCollection>;
  character?: Maybe<CharacterEntityResponse>;
  characters?: Maybe<CharacterEntityResponseCollection>;
  chart?: Maybe<ChartEntityResponse>;
  chartAchieve?: Maybe<ChartAchieveEntityResponse>;
  chartAchieves?: Maybe<ChartAchieveEntityResponseCollection>;
  chartDesigner?: Maybe<ChartDesignerEntityResponse>;
  chartDesigners?: Maybe<ChartDesignerEntityResponseCollection>;
  charts?: Maybe<ChartEntityResponseCollection>;
  clubItem?: Maybe<ClubItemEntityResponse>;
  clubItemDetail?: Maybe<ClubItemDetailEntityResponse>;
  clubItemDetails?: Maybe<ClubItemDetailEntityResponseCollection>;
  clubItemSpot?: Maybe<ClubItemSpotEntityResponse>;
  clubItemSpots?: Maybe<ClubItemSpotEntityResponseCollection>;
  clubItems?: Maybe<ClubItemEntityResponseCollection>;
  episode?: Maybe<EpisodeEntityResponse>;
  episodes?: Maybe<EpisodeEntityResponseCollection>;
  event?: Maybe<EventEntityResponse>;
  eventAggregationBase?: Maybe<EventAggregationBaseEntityResponse>;
  eventAggregationBases?: Maybe<EventAggregationBaseEntityResponseCollection>;
  eventMedleySetlist?: Maybe<EventMedleySetlistEntityResponse>;
  eventMedleySetlists?: Maybe<EventMedleySetlistEntityResponseCollection>;
  eventPointReward?: Maybe<EventPointRewardEntityResponse>;
  eventPointRewards?: Maybe<EventPointRewardEntityResponseCollection>;
  eventRankingReward?: Maybe<EventRankingRewardEntityResponse>;
  eventRankingRewards?: Maybe<EventRankingRewardEntityResponseCollection>;
  eventSpecificBonus?: Maybe<EventSpecificBonusEntityResponse>;
  eventSpecificBonuses?: Maybe<EventSpecificBonusEntityResponseCollection>;
  events?: Maybe<EventEntityResponseCollection>;
  exchange?: Maybe<ExchangeEntityResponse>;
  exchangeItem?: Maybe<ExchangeItemEntityResponse>;
  exchangeItems?: Maybe<ExchangeItemEntityResponseCollection>;
  exchanges?: Maybe<ExchangeEntityResponseCollection>;
  gacha?: Maybe<GachaEntityResponse>;
  gachas?: Maybe<GachaEntityResponseCollection>;
  honor?: Maybe<HonorEntityResponse>;
  honors?: Maybe<HonorEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  live2DUiChat?: Maybe<Live2DUiChatEntityResponse>;
  live2DUiChats?: Maybe<Live2DUiChatEntityResponseCollection>;
  liveResultEpisode?: Maybe<LiveResultEpisodeEntityResponse>;
  liveResultEpisodes?: Maybe<LiveResultEpisodeEntityResponseCollection>;
  loginBonus?: Maybe<LoginBonusEntityResponse>;
  loginBonuses?: Maybe<LoginBonusEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  missionDetail?: Maybe<MissionDetailEntityResponse>;
  missionDetails?: Maybe<MissionDetailEntityResponseCollection>;
  missionGroup?: Maybe<MissionGroupEntityResponse>;
  missionGroups?: Maybe<MissionGroupEntityResponseCollection>;
  missionPanel?: Maybe<MissionPanelEntityResponse>;
  missionPanels?: Maybe<MissionPanelEntityResponseCollection>;
  music?: Maybe<MusicEntityResponse>;
  musics?: Maybe<MusicEntityResponseCollection>;
  optionPreset?: Maybe<OptionPresetEntityResponse>;
  optionPresets?: Maybe<OptionPresetEntityResponseCollection>;
  parameterBonus?: Maybe<ParameterBonusEntityResponse>;
  parameterBonuses?: Maybe<ParameterBonusEntityResponseCollection>;
  passiveSkill?: Maybe<PassiveSkillEntityResponse>;
  passiveSkillDescription?: Maybe<PassiveSkillDescriptionEntityResponse>;
  passiveSkillDescriptions?: Maybe<PassiveSkillDescriptionEntityResponseCollection>;
  passiveSkillExp?: Maybe<PassiveSkillExpEntityResponse>;
  passiveSkillExps?: Maybe<PassiveSkillExpEntityResponseCollection>;
  passiveSkills?: Maybe<PassiveSkillEntityResponseCollection>;
  questBlock?: Maybe<QuestBlockEntityResponse>;
  questBlocks?: Maybe<QuestBlockEntityResponseCollection>;
  questClubDeck?: Maybe<QuestClubDeckEntityResponse>;
  questClubDecks?: Maybe<QuestClubDeckEntityResponseCollection>;
  questDeck?: Maybe<QuestDeckEntityResponse>;
  questDecks?: Maybe<QuestDeckEntityResponseCollection>;
  questMap?: Maybe<QuestMapEntityResponse>;
  questMaps?: Maybe<QuestMapEntityResponseCollection>;
  rarities?: Maybe<RarityEntityResponseCollection>;
  rarity?: Maybe<RarityEntityResponse>;
  reward?: Maybe<RewardEntityResponse>;
  rewards?: Maybe<RewardEntityResponseCollection>;
  skill?: Maybe<SkillEntityResponse>;
  skills?: Maybe<SkillEntityResponseCollection>;
  stamp?: Maybe<StampEntityResponse>;
  stamps?: Maybe<StampEntityResponseCollection>;
  stock?: Maybe<StockEntityResponse>;
  stockViewCategories?: Maybe<StockViewCategoryEntityResponseCollection>;
  stockViewCategory?: Maybe<StockViewCategoryEntityResponse>;
  stocks?: Maybe<StockEntityResponseCollection>;
  unit?: Maybe<UnitEntityResponse>;
  units?: Maybe<UnitEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryAssistOptionPresetArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryAssistOptionPresetsArgs = {
  filters?: InputMaybe<AssistOptionPresetFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryAttributeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryAttributesArgs = {
  filters?: InputMaybe<AttributeFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCardArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryCardsArgs = {
  filters?: InputMaybe<CardFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCharacterArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryCharactersArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryChartArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryChartAchieveArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryChartAchievesArgs = {
  filters?: InputMaybe<ChartAchieveFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryChartDesignerArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryChartDesignersArgs = {
  filters?: InputMaybe<ChartDesignerFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryChartsArgs = {
  filters?: InputMaybe<ChartFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryClubItemArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryClubItemDetailArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryClubItemDetailsArgs = {
  filters?: InputMaybe<ClubItemDetailFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryClubItemSpotArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryClubItemSpotsArgs = {
  filters?: InputMaybe<ClubItemSpotFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryClubItemsArgs = {
  filters?: InputMaybe<ClubItemFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEpisodeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEpisodesArgs = {
  filters?: InputMaybe<EpisodeFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventAggregationBaseArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventAggregationBasesArgs = {
  filters?: InputMaybe<EventAggregationBaseFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventMedleySetlistArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventMedleySetlistsArgs = {
  filters?: InputMaybe<EventMedleySetlistFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventPointRewardArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventPointRewardsArgs = {
  filters?: InputMaybe<EventPointRewardFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventRankingRewardArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventRankingRewardsArgs = {
  filters?: InputMaybe<EventRankingRewardFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventSpecificBonusArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryEventSpecificBonusesArgs = {
  filters?: InputMaybe<EventSpecificBonusFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryExchangeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryExchangeItemArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryExchangeItemsArgs = {
  filters?: InputMaybe<ExchangeItemFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryExchangesArgs = {
  filters?: InputMaybe<ExchangeFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGachaArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryGachasArgs = {
  filters?: InputMaybe<GachaFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryHonorArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryHonorsArgs = {
  filters?: InputMaybe<HonorFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryLive2DUiChatArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryLive2DUiChatsArgs = {
  filters?: InputMaybe<Live2DUiChatFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryLiveResultEpisodeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryLiveResultEpisodesArgs = {
  filters?: InputMaybe<LiveResultEpisodeFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryLoginBonusArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryLoginBonusesArgs = {
  filters?: InputMaybe<LoginBonusFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMissionDetailArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryMissionDetailsArgs = {
  filters?: InputMaybe<MissionDetailFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMissionGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryMissionGroupsArgs = {
  filters?: InputMaybe<MissionGroupFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMissionPanelArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryMissionPanelsArgs = {
  filters?: InputMaybe<MissionPanelFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryMusicArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryMusicsArgs = {
  filters?: InputMaybe<MusicFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOptionPresetArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryOptionPresetsArgs = {
  filters?: InputMaybe<OptionPresetFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryParameterBonusArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryParameterBonusesArgs = {
  filters?: InputMaybe<ParameterBonusFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPassiveSkillArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPassiveSkillDescriptionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPassiveSkillDescriptionsArgs = {
  filters?: InputMaybe<PassiveSkillDescriptionFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPassiveSkillExpArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPassiveSkillExpsArgs = {
  filters?: InputMaybe<PassiveSkillExpFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPassiveSkillsArgs = {
  filters?: InputMaybe<PassiveSkillFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryQuestBlockArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryQuestBlocksArgs = {
  filters?: InputMaybe<QuestBlockFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryQuestClubDeckArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryQuestClubDecksArgs = {
  filters?: InputMaybe<QuestClubDeckFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryQuestDeckArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryQuestDecksArgs = {
  filters?: InputMaybe<QuestDeckFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryQuestMapArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryQuestMapsArgs = {
  filters?: InputMaybe<QuestMapFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRaritiesArgs = {
  filters?: InputMaybe<RarityFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryRarityArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryRewardArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryRewardsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySkillArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QuerySkillsArgs = {
  filters?: InputMaybe<SkillFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryStampArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryStampsArgs = {
  filters?: InputMaybe<StampFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryStockArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryStockViewCategoriesArgs = {
  filters?: InputMaybe<StockViewCategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryStockViewCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryStocksArgs = {
  filters?: InputMaybe<StockFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUnitArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryUnitsArgs = {
  filters?: InputMaybe<UnitFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QuestBlock = {
  __typename?: 'QuestBlock';
  assistOption?: Maybe<AssistOptionPresetEntityResponse>;
  chart?: Maybe<ChartEntityResponse>;
  chartSection?: Maybe<Enum_Questblock_Chartsection>;
  clubDeckId?: Maybe<Scalars['Int']>;
  clubFormationId?: Maybe<Scalars['Int']>;
  conditionType?: Maybe<Enum_Questblock_Conditiontype>;
  conditionValue?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deckId?: Maybe<Scalars['Int']>;
  deckPower?: Maybe<Scalars['Int']>;
  firstRewards?: Maybe<RewardRelationResponseCollection>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<QuestBlockRelationResponseCollection>;
  loopRewards?: Maybe<RewardRelationResponseCollection>;
  map?: Maybe<QuestMapEntityResponse>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  option?: Maybe<OptionPresetEntityResponse>;
  order?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type QuestBlockFirstRewardsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestBlockLocalizationsArgs = {
  filters?: InputMaybe<QuestBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestBlockLoopRewardsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QuestBlockEntity = {
  __typename?: 'QuestBlockEntity';
  attributes?: Maybe<QuestBlock>;
  id?: Maybe<Scalars['ID']>;
};

export type QuestBlockEntityResponse = {
  __typename?: 'QuestBlockEntityResponse';
  data?: Maybe<QuestBlockEntity>;
};

export type QuestBlockEntityResponseCollection = {
  __typename?: 'QuestBlockEntityResponseCollection';
  data: Array<QuestBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type QuestBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuestBlockFiltersInput>>>;
  assistOption?: InputMaybe<AssistOptionPresetFiltersInput>;
  chart?: InputMaybe<ChartFiltersInput>;
  chartSection?: InputMaybe<StringFilterInput>;
  clubDeckId?: InputMaybe<IntFilterInput>;
  clubFormationId?: InputMaybe<IntFilterInput>;
  conditionType?: InputMaybe<StringFilterInput>;
  conditionValue?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  deckId?: InputMaybe<IntFilterInput>;
  deckPower?: InputMaybe<IntFilterInput>;
  firstRewards?: InputMaybe<RewardFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<QuestBlockFiltersInput>;
  loopRewards?: InputMaybe<RewardFiltersInput>;
  map?: InputMaybe<QuestMapFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<QuestBlockFiltersInput>;
  option?: InputMaybe<OptionPresetFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuestBlockFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuestBlockInput = {
  assistOption?: InputMaybe<Scalars['ID']>;
  chart?: InputMaybe<Scalars['ID']>;
  chartSection?: InputMaybe<Enum_Questblock_Chartsection>;
  clubDeckId?: InputMaybe<Scalars['Int']>;
  clubFormationId?: InputMaybe<Scalars['Int']>;
  conditionType?: InputMaybe<Enum_Questblock_Conditiontype>;
  conditionValue?: InputMaybe<Scalars['Int']>;
  deckId?: InputMaybe<Scalars['Int']>;
  deckPower?: InputMaybe<Scalars['Int']>;
  firstRewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  loopRewards?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  map?: InputMaybe<Scalars['ID']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  option?: InputMaybe<Scalars['ID']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type QuestBlockRelationResponseCollection = {
  __typename?: 'QuestBlockRelationResponseCollection';
  data: Array<QuestBlockEntity>;
};

export type QuestClubDeck = {
  __typename?: 'QuestClubDeck';
  createdAt?: Maybe<Scalars['DateTime']>;
  item?: Maybe<ClubItemEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<QuestClubDeckRelationResponseCollection>;
  spot?: Maybe<ClubItemSpotEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  useSpecialEffect?: Maybe<Scalars['Boolean']>;
};


export type QuestClubDeckLocalizationsArgs = {
  filters?: InputMaybe<QuestClubDeckFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QuestClubDeckEntity = {
  __typename?: 'QuestClubDeckEntity';
  attributes?: Maybe<QuestClubDeck>;
  id?: Maybe<Scalars['ID']>;
};

export type QuestClubDeckEntityResponse = {
  __typename?: 'QuestClubDeckEntityResponse';
  data?: Maybe<QuestClubDeckEntity>;
};

export type QuestClubDeckEntityResponseCollection = {
  __typename?: 'QuestClubDeckEntityResponseCollection';
  data: Array<QuestClubDeckEntity>;
  meta: ResponseCollectionMeta;
};

export type QuestClubDeckFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuestClubDeckFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  item?: InputMaybe<ClubItemFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<QuestClubDeckFiltersInput>;
  not?: InputMaybe<QuestClubDeckFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuestClubDeckFiltersInput>>>;
  spot?: InputMaybe<ClubItemSpotFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  useSpecialEffect?: InputMaybe<BooleanFilterInput>;
};

export type QuestClubDeckInput = {
  item?: InputMaybe<Scalars['ID']>;
  spot?: InputMaybe<Scalars['ID']>;
  useSpecialEffect?: InputMaybe<Scalars['Boolean']>;
};

export type QuestClubDeckRelationResponseCollection = {
  __typename?: 'QuestClubDeckRelationResponseCollection';
  data: Array<QuestClubDeckEntity>;
};

export type QuestDeck = {
  __typename?: 'QuestDeck';
  card?: Maybe<CardEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  illustType?: Maybe<Enum_Questdeck_Illusttype>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<QuestDeckRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type QuestDeckLocalizationsArgs = {
  filters?: InputMaybe<QuestDeckFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QuestDeckEntity = {
  __typename?: 'QuestDeckEntity';
  attributes?: Maybe<QuestDeck>;
  id?: Maybe<Scalars['ID']>;
};

export type QuestDeckEntityResponse = {
  __typename?: 'QuestDeckEntityResponse';
  data?: Maybe<QuestDeckEntity>;
};

export type QuestDeckEntityResponseCollection = {
  __typename?: 'QuestDeckEntityResponseCollection';
  data: Array<QuestDeckEntity>;
  meta: ResponseCollectionMeta;
};

export type QuestDeckFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuestDeckFiltersInput>>>;
  card?: InputMaybe<CardFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  illustType?: InputMaybe<StringFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<QuestDeckFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<QuestDeckFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuestDeckFiltersInput>>>;
  order?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuestDeckInput = {
  card?: InputMaybe<Scalars['ID']>;
  illustType?: InputMaybe<Enum_Questdeck_Illusttype>;
  masterID?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type QuestDeckRelationResponseCollection = {
  __typename?: 'QuestDeckRelationResponseCollection';
  data: Array<QuestDeckEntity>;
};

export type QuestMap = {
  __typename?: 'QuestMap';
  backgroundPrefabFileName?: Maybe<Scalars['String']>;
  bgm?: Maybe<Scalars['String']>;
  blocks?: Maybe<QuestBlockRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<QuestMapRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  maxPlayableCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  recoveryStockAmount?: Maybe<Scalars['Int']>;
  recoveryStockId?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type QuestMapBlocksArgs = {
  filters?: InputMaybe<QuestBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuestMapLocalizationsArgs = {
  filters?: InputMaybe<QuestMapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QuestMapEntity = {
  __typename?: 'QuestMapEntity';
  attributes?: Maybe<QuestMap>;
  id?: Maybe<Scalars['ID']>;
};

export type QuestMapEntityResponse = {
  __typename?: 'QuestMapEntityResponse';
  data?: Maybe<QuestMapEntity>;
};

export type QuestMapEntityResponseCollection = {
  __typename?: 'QuestMapEntityResponseCollection';
  data: Array<QuestMapEntity>;
  meta: ResponseCollectionMeta;
};

export type QuestMapFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuestMapFiltersInput>>>;
  backgroundPrefabFileName?: InputMaybe<StringFilterInput>;
  bgm?: InputMaybe<StringFilterInput>;
  blocks?: InputMaybe<QuestBlockFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<QuestMapFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  maxPlayableCount?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<QuestMapFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuestMapFiltersInput>>>;
  recoveryStockAmount?: InputMaybe<IntFilterInput>;
  recoveryStockId?: InputMaybe<IntFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuestMapInput = {
  backgroundPrefabFileName?: InputMaybe<Scalars['String']>;
  bgm?: InputMaybe<Scalars['String']>;
  blocks?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  masterID?: InputMaybe<Scalars['Int']>;
  maxPlayableCount?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recoveryStockAmount?: InputMaybe<Scalars['Int']>;
  recoveryStockId?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type QuestMapRelationResponseCollection = {
  __typename?: 'QuestMapRelationResponseCollection';
  data: Array<QuestMapEntity>;
};

export type Rarity = {
  __typename?: 'Rarity';
  createdAt?: Maybe<Scalars['DateTime']>;
  limitBreakBonuses?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<RarityRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  maxLevelParameterRates?: Maybe<Scalars['JSON']>;
  maxLevels?: Maybe<Scalars['JSON']>;
  sealAmount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type RarityLocalizationsArgs = {
  filters?: InputMaybe<RarityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RarityEntity = {
  __typename?: 'RarityEntity';
  attributes?: Maybe<Rarity>;
  id?: Maybe<Scalars['ID']>;
};

export type RarityEntityResponse = {
  __typename?: 'RarityEntityResponse';
  data?: Maybe<RarityEntity>;
};

export type RarityEntityResponseCollection = {
  __typename?: 'RarityEntityResponseCollection';
  data: Array<RarityEntity>;
  meta: ResponseCollectionMeta;
};

export type RarityFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RarityFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  limitBreakBonuses?: InputMaybe<JsonFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<RarityFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  maxLevelParameterRates?: InputMaybe<JsonFilterInput>;
  maxLevels?: InputMaybe<JsonFilterInput>;
  not?: InputMaybe<RarityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RarityFiltersInput>>>;
  sealAmount?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RarityInput = {
  limitBreakBonuses?: InputMaybe<Scalars['JSON']>;
  masterID?: InputMaybe<Scalars['Int']>;
  maxLevelParameterRates?: InputMaybe<Scalars['JSON']>;
  maxLevels?: InputMaybe<Scalars['JSON']>;
  sealAmount?: InputMaybe<Scalars['Int']>;
};

export type RarityRelationResponseCollection = {
  __typename?: 'RarityRelationResponseCollection';
  data: Array<RarityEntity>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type Reward = {
  __typename?: 'Reward';
  amount?: Maybe<Scalars['Int']>;
  category?: Maybe<Enum_Reward_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<RewardRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  rewardId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type RewardLocalizationsArgs = {
  filters?: InputMaybe<RewardFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RewardEntity = {
  __typename?: 'RewardEntity';
  attributes?: Maybe<Reward>;
  id?: Maybe<Scalars['ID']>;
};

export type RewardEntityResponse = {
  __typename?: 'RewardEntityResponse';
  data?: Maybe<RewardEntity>;
};

export type RewardEntityResponseCollection = {
  __typename?: 'RewardEntityResponseCollection';
  data: Array<RewardEntity>;
  meta: ResponseCollectionMeta;
};

export type RewardFiltersInput = {
  amount?: InputMaybe<IntFilterInput>;
  and?: InputMaybe<Array<InputMaybe<RewardFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<RewardFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<RewardFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RewardFiltersInput>>>;
  rewardId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RewardInput = {
  amount?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Enum_Reward_Category>;
  masterID?: InputMaybe<Scalars['Int']>;
  rewardId?: InputMaybe<Scalars['Int']>;
};

export type RewardRelationResponseCollection = {
  __typename?: 'RewardRelationResponseCollection';
  data: Array<RewardEntity>;
};

export type Skill = {
  __typename?: 'Skill';
  comboSupportCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<SkillRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  maxRecoveryValue?: Maybe<Scalars['Int']>;
  maxSeconds?: Maybe<Scalars['Float']>;
  minRecoveryValue?: Maybe<Scalars['Int']>;
  minSeconds?: Maybe<Scalars['Float']>;
  perfectScoreUpRate?: Maybe<Scalars['Int']>;
  scoreUpRate?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SkillLocalizationsArgs = {
  filters?: InputMaybe<SkillFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SkillEntity = {
  __typename?: 'SkillEntity';
  attributes?: Maybe<Skill>;
  id?: Maybe<Scalars['ID']>;
};

export type SkillEntityResponse = {
  __typename?: 'SkillEntityResponse';
  data?: Maybe<SkillEntity>;
};

export type SkillEntityResponseCollection = {
  __typename?: 'SkillEntityResponseCollection';
  data: Array<SkillEntity>;
  meta: ResponseCollectionMeta;
};

export type SkillFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SkillFiltersInput>>>;
  comboSupportCount?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<SkillFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  maxRecoveryValue?: InputMaybe<IntFilterInput>;
  maxSeconds?: InputMaybe<FloatFilterInput>;
  minRecoveryValue?: InputMaybe<IntFilterInput>;
  minSeconds?: InputMaybe<FloatFilterInput>;
  not?: InputMaybe<SkillFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SkillFiltersInput>>>;
  perfectScoreUpRate?: InputMaybe<IntFilterInput>;
  scoreUpRate?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SkillInput = {
  comboSupportCount?: InputMaybe<Scalars['Int']>;
  masterID?: InputMaybe<Scalars['Int']>;
  maxRecoveryValue?: InputMaybe<Scalars['Int']>;
  maxSeconds?: InputMaybe<Scalars['Float']>;
  minRecoveryValue?: InputMaybe<Scalars['Int']>;
  minSeconds?: InputMaybe<Scalars['Float']>;
  perfectScoreUpRate?: InputMaybe<Scalars['Int']>;
  scoreUpRate?: InputMaybe<Scalars['Int']>;
};

export type SkillRelationResponseCollection = {
  __typename?: 'SkillRelationResponseCollection';
  data: Array<SkillEntity>;
};

export type Stamp = {
  __typename?: 'Stamp';
  category?: Maybe<Enum_Stamp_Category>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  hasVoice?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<StampRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type StampLocalizationsArgs = {
  filters?: InputMaybe<StampFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StampEntity = {
  __typename?: 'StampEntity';
  attributes?: Maybe<Stamp>;
  id?: Maybe<Scalars['ID']>;
};

export type StampEntityResponse = {
  __typename?: 'StampEntityResponse';
  data?: Maybe<StampEntity>;
};

export type StampEntityResponseCollection = {
  __typename?: 'StampEntityResponseCollection';
  data: Array<StampEntity>;
  meta: ResponseCollectionMeta;
};

export type StampFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<StampFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  hasVoice?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<StampFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<StampFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<StampFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type StampInput = {
  category?: InputMaybe<Enum_Stamp_Category>;
  description?: InputMaybe<Scalars['String']>;
  hasVoice?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type StampRelationResponseCollection = {
  __typename?: 'StampRelationResponseCollection';
  data: Array<StampEntity>;
};

export type Stock = {
  __typename?: 'Stock';
  attributeId?: Maybe<Scalars['Int']>;
  buffCharacterId?: Maybe<Scalars['Int']>;
  category?: Maybe<Enum_Stock_Category>;
  consumeAmount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  exp?: Maybe<Scalars['Int']>;
  isAppropriateSales?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<StockRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  maxAmount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  random?: Maybe<Array<Maybe<ComponentGameRandomStock>>>;
  rarity?: Maybe<Scalars['Int']>;
  recoveryAmount?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['DateTime']>;
  summary?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  viewCategory?: Maybe<StockViewCategoryEntityResponse>;
};


export type StockLocalizationsArgs = {
  filters?: InputMaybe<StockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StockRandomArgs = {
  filters?: InputMaybe<ComponentGameRandomStockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StockEntity = {
  __typename?: 'StockEntity';
  attributes?: Maybe<Stock>;
  id?: Maybe<Scalars['ID']>;
};

export type StockEntityResponse = {
  __typename?: 'StockEntityResponse';
  data?: Maybe<StockEntity>;
};

export type StockEntityResponseCollection = {
  __typename?: 'StockEntityResponseCollection';
  data: Array<StockEntity>;
  meta: ResponseCollectionMeta;
};

export type StockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<StockFiltersInput>>>;
  attributeId?: InputMaybe<IntFilterInput>;
  buffCharacterId?: InputMaybe<IntFilterInput>;
  category?: InputMaybe<StringFilterInput>;
  consumeAmount?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  exp?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isAppropriateSales?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<StockFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  maxAmount?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<StockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<StockFiltersInput>>>;
  rarity?: InputMaybe<IntFilterInput>;
  recoveryAmount?: InputMaybe<IntFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  viewCategory?: InputMaybe<StockViewCategoryFiltersInput>;
};

export type StockInput = {
  attributeId?: InputMaybe<Scalars['Int']>;
  buffCharacterId?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Enum_Stock_Category>;
  consumeAmount?: InputMaybe<Scalars['Int']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  exp?: InputMaybe<Scalars['Int']>;
  isAppropriateSales?: InputMaybe<Scalars['Boolean']>;
  masterID?: InputMaybe<Scalars['Int']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  random?: InputMaybe<Array<InputMaybe<ComponentGameRandomStockInput>>>;
  rarity?: InputMaybe<Scalars['Int']>;
  recoveryAmount?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  summary?: InputMaybe<Scalars['String']>;
  viewCategory?: InputMaybe<Scalars['ID']>;
};

export type StockRelationResponseCollection = {
  __typename?: 'StockRelationResponseCollection';
  data: Array<StockEntity>;
};

export type StockViewCategory = {
  __typename?: 'StockViewCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<StockViewCategoryRelationResponseCollection>;
  masterID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  stocks?: Maybe<StockRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type StockViewCategoryLocalizationsArgs = {
  filters?: InputMaybe<StockViewCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type StockViewCategoryStocksArgs = {
  filters?: InputMaybe<StockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StockViewCategoryEntity = {
  __typename?: 'StockViewCategoryEntity';
  attributes?: Maybe<StockViewCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type StockViewCategoryEntityResponse = {
  __typename?: 'StockViewCategoryEntityResponse';
  data?: Maybe<StockViewCategoryEntity>;
};

export type StockViewCategoryEntityResponseCollection = {
  __typename?: 'StockViewCategoryEntityResponseCollection';
  data: Array<StockViewCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type StockViewCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<StockViewCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<StockViewCategoryFiltersInput>;
  masterID?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<StockViewCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<StockViewCategoryFiltersInput>>>;
  stocks?: InputMaybe<StockFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type StockViewCategoryInput = {
  masterID?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  stocks?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type StockViewCategoryRelationResponseCollection = {
  __typename?: 'StockViewCategoryRelationResponseCollection';
  data: Array<StockViewCategoryEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Unit = {
  __typename?: 'Unit';
  canTraining?: Maybe<Scalars['Boolean']>;
  characters?: Maybe<CharacterRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  episode?: Maybe<Array<Maybe<ComponentEpisodeUnitEpisode>>>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<UnitRelationResponseCollection>;
  mainColorCode?: Maybe<Scalars['String']>;
  masterID?: Maybe<Scalars['Int']>;
  musics?: Maybe<MusicRelationResponseCollection>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  subColorCode?: Maybe<Scalars['String']>;
  summaries?: Maybe<Scalars['JSON']>;
  summary?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UnitCharactersArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UnitEpisodeArgs = {
  filters?: InputMaybe<ComponentEpisodeUnitEpisodeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UnitLocalizationsArgs = {
  filters?: InputMaybe<UnitFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UnitMusicsArgs = {
  filters?: InputMaybe<MusicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UnitEntity = {
  __typename?: 'UnitEntity';
  attributes?: Maybe<Unit>;
  id?: Maybe<Scalars['ID']>;
};

export type UnitEntityResponse = {
  __typename?: 'UnitEntityResponse';
  data?: Maybe<UnitEntity>;
};

export type UnitEntityResponseCollection = {
  __typename?: 'UnitEntityResponseCollection';
  data: Array<UnitEntity>;
  meta: ResponseCollectionMeta;
};

export type UnitFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UnitFiltersInput>>>;
  canTraining?: InputMaybe<BooleanFilterInput>;
  characters?: InputMaybe<CharacterFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<UnitFiltersInput>;
  mainColorCode?: InputMaybe<StringFilterInput>;
  masterID?: InputMaybe<IntFilterInput>;
  musics?: InputMaybe<MusicFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UnitFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UnitFiltersInput>>>;
  shortName?: InputMaybe<StringFilterInput>;
  subColorCode?: InputMaybe<StringFilterInput>;
  summaries?: InputMaybe<JsonFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UnitInput = {
  canTraining?: InputMaybe<Scalars['Boolean']>;
  characters?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  episode?: InputMaybe<Array<InputMaybe<ComponentEpisodeUnitEpisodeInput>>>;
  mainColorCode?: InputMaybe<Scalars['String']>;
  masterID?: InputMaybe<Scalars['Int']>;
  musics?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  shortName?: InputMaybe<Scalars['String']>;
  subColorCode?: InputMaybe<Scalars['String']>;
  summaries?: InputMaybe<Scalars['JSON']>;
  summary?: InputMaybe<Scalars['String']>;
};

export type UnitRelationResponseCollection = {
  __typename?: 'UnitRelationResponseCollection';
  data: Array<UnitEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type UnitsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type UnitsQuery = { __typename?: 'Query', units?: { __typename?: 'UnitEntityResponseCollection', data: Array<{ __typename?: 'UnitEntity', id?: string | null, attributes?: { __typename?: 'Unit', name?: string | null, masterID?: number | null, characters?: { __typename?: 'CharacterRelationResponseCollection', data: Array<{ __typename?: 'CharacterEntity', id?: string | null, attributes?: { __typename?: 'Character', fullNameEnglish?: string | null, firstNameEnglish?: string | null, masterID?: number | null } | null }> } | null } | null }> } | null };

export type CardsQueryVariables = Exact<{
  cardsFilters?: InputMaybe<CardFiltersInput>;
  cardsPagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  cardsLocale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type CardsQuery = { __typename?: 'Query', cards?: { __typename?: 'CardEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, pageCount: number } }, data: Array<{ __typename?: 'CardEntity', id?: string | null, attributes?: { __typename?: 'Card', rarity?: number | null, masterID?: number | null, cardName?: string | null, attribute?: number | null, character?: { __typename?: 'CharacterEntityResponse', data?: { __typename?: 'CharacterEntity', attributes?: { __typename?: 'Character', unit?: { __typename?: 'UnitEntityResponse', data?: { __typename?: 'UnitEntity', id?: string | null, attributes?: { __typename?: 'Unit', masterID?: number | null } | null } | null } | null } | null } | null } | null } | null }> } | null };

export type CardQueryVariables = Exact<{
  cardId?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type CardQuery = { __typename?: 'Query', card?: { __typename?: 'CardEntityResponse', data?: { __typename?: 'CardEntity', id?: string | null, attributes?: { __typename?: 'Card', masterID?: number | null, attribute?: number | null, cardName?: string | null, rarity?: number | null, skillName?: string | null, gachaMessage?: string | null, debutOrder?: number | null, startDate?: any | null, endDate?: any | null, maxParameters?: { __typename?: 'ComponentCharacterMaxParameters', id: string, heart?: number | null, technique?: number | null, physical?: number | null } | null, character?: { __typename?: 'CharacterEntityResponse', data?: { __typename?: 'CharacterEntity', attributes?: { __typename?: 'Character', fullNameEnglish?: string | null, firstNameEnglish?: string | null, unit?: { __typename?: 'UnitEntityResponse', data?: { __typename?: 'UnitEntity', attributes?: { __typename?: 'Unit', masterID?: number | null, name?: string | null } | null } | null } | null } | null } | null } | null, skill?: { __typename?: 'SkillEntityResponse', data?: { __typename?: 'SkillEntity', attributes?: { __typename?: 'Skill', masterID?: number | null, minRecoveryValue?: number | null, maxRecoveryValue?: number | null, comboSupportCount?: number | null, scoreUpRate?: number | null, minSeconds?: number | null, maxSeconds?: number | null, perfectScoreUpRate?: number | null } | null } | null } | null } | null } | null } | null };

export type CharacterQueryVariables = Exact<{
  characterId?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  cardsPagination?: InputMaybe<PaginationArg>;
}>;


export type CharacterQuery = { __typename?: 'Query', character?: { __typename?: 'CharacterEntityResponse', data?: { __typename?: 'CharacterEntity', attributes?: { __typename?: 'Character', fullName?: string | null, firstName?: string | null, firstNameEnglish?: string | null, fullNameEnglish?: string | null, colorCode?: string | null, masterID?: number | null, unit?: { __typename?: 'UnitEntityResponse', data?: { __typename?: 'UnitEntity', attributes?: { __typename?: 'Unit', masterID?: number | null, name?: string | null } | null } | null } | null, cards?: { __typename?: 'CardRelationResponseCollection', data: Array<{ __typename?: 'CardEntity', id?: string | null, attributes?: { __typename?: 'Card', cardName?: string | null, rarity?: number | null, attribute?: number | null, masterID?: number | null } | null }> } | null } | null } | null } | null };

export type MusicsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<MusicFiltersInput>;
}>;


export type MusicsQuery = { __typename?: 'Query', musics?: { __typename?: 'MusicEntityResponseCollection', data: Array<{ __typename?: 'MusicEntity', id?: string | null, attributes?: { __typename?: 'Music', name?: string | null, composer?: string | null, masterID?: number | null, category?: Enum_Music_Category | null, musicBpm?: number | null, unit?: { __typename?: 'UnitEntityResponse', data?: { __typename?: 'UnitEntity', attributes?: { __typename?: 'Unit', name?: string | null } | null } | null } | null, charts?: { __typename?: 'ChartRelationResponseCollection', data: Array<{ __typename?: 'ChartEntity', id?: string | null, attributes?: { __typename?: 'Chart', level?: number | null } | null }> } | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, pageCount: number } } } | null };

export type EventsQueryVariables = Exact<{
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type EventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventEntityResponseCollection', data: Array<{ __typename?: 'EventEntity', id?: string | null, attributes?: { __typename?: 'Event', masterID?: number | null, name?: string | null, type?: Enum_Event_Type | null, startDate?: any | null, endDate?: any | null } | null }>, meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, pageCount: number } } } | null };

export type MusicQueryVariables = Exact<{
  musicId?: InputMaybe<Scalars['ID']>;
}>;


export type MusicQuery = { __typename?: 'Query', music?: { __typename?: 'MusicEntityResponse', data?: { __typename?: 'MusicEntity', id?: string | null, attributes?: { __typename?: 'Music', name?: string | null, readName?: string | null, lyrist?: string | null, composer?: string | null, arranger?: string | null, specialUnitName?: string | null, category?: Enum_Music_Category | null, musicBpm?: number | null, openKey?: number | null, isHidden?: boolean | null, hasMovie?: boolean | null, excludeChallenge?: boolean | null, canFairUse?: boolean | null, startDate?: any | null, endDate?: any | null, masterID?: number | null, unused?: boolean | null, unit?: { __typename?: 'UnitEntityResponse', data?: { __typename?: 'UnitEntity', attributes?: { __typename?: 'Unit', name?: string | null } | null } | null } | null, musicMix?: Array<{ __typename?: 'ComponentMusicMusicMix', section?: Enum_Componentmusicmusicmix_Section | null, startTime?: number | null, startTimeBpm?: number | null, endTime?: number | null, endTimeBpm?: number | null, enableLongMixStart?: boolean | null, enableLongMixEnd?: boolean | null, id: string } | null> | null, charts?: { __typename?: 'ChartRelationResponseCollection', data: Array<{ __typename?: 'ChartEntity', id?: string | null, attributes?: { __typename?: 'Chart', difficulty?: Enum_Chart_Difficulty | null, level?: number | null, masterID?: number | null, achieveId?: number | null, chartNoteCount?: Array<{ __typename?: 'ComponentMusicChartNoteCount', section?: Enum_Componentmusicchartnotecount_Section | null, count?: number | null, id: string } | null> | null, designer?: { __typename?: 'ChartDesignerEntityResponse', data?: { __typename?: 'ChartDesignerEntity', attributes?: { __typename?: 'ChartDesigner', name?: string | null } | null } | null } | null, trends?: { __typename?: 'ComponentMusicTrends', danger?: number | null, notes?: number | null, scratch?: number | null, effect?: number | null, technique?: number | null } | null } | null }> } | null } | null } | null } | null };


export const UnitsDocument = gql`
    query Units($locale: I18NLocaleCode) {
  units(locale: $locale) {
    data {
      id
      attributes {
        name
        masterID
        characters {
          data {
            id
            attributes {
              fullNameEnglish
              firstNameEnglish
              masterID
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useUnitsQuery__
 *
 * To run a query within a React component, call `useUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitsQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useUnitsQuery(baseOptions?: Apollo.QueryHookOptions<UnitsQuery, UnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnitsQuery, UnitsQueryVariables>(UnitsDocument, options);
      }
export function useUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnitsQuery, UnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnitsQuery, UnitsQueryVariables>(UnitsDocument, options);
        }
export type UnitsQueryHookResult = ReturnType<typeof useUnitsQuery>;
export type UnitsLazyQueryHookResult = ReturnType<typeof useUnitsLazyQuery>;
export type UnitsQueryResult = Apollo.QueryResult<UnitsQuery, UnitsQueryVariables>;
export const CardsDocument = gql`
    query Cards($cardsFilters: CardFiltersInput, $cardsPagination: PaginationArg, $sort: [String], $cardsLocale: I18NLocaleCode) {
  cards(
    filters: $cardsFilters
    pagination: $cardsPagination
    sort: $sort
    locale: $cardsLocale
  ) {
    meta {
      pagination {
        page
        pageCount
      }
    }
    data {
      id
      attributes {
        rarity
        masterID
        cardName
        attribute
        character {
          data {
            attributes {
              unit {
                data {
                  id
                  attributes {
                    masterID
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *      cardsFilters: // value for 'cardsFilters'
 *      cardsPagination: // value for 'cardsPagination'
 *      sort: // value for 'sort'
 *      cardsLocale: // value for 'cardsLocale'
 *   },
 * });
 */
export function useCardsQuery(baseOptions?: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsQueryResult = Apollo.QueryResult<CardsQuery, CardsQueryVariables>;
export const CardDocument = gql`
    query Card($cardId: ID, $locale: I18NLocaleCode) {
  card(id: $cardId, locale: $locale) {
    data {
      id
      attributes {
        masterID
        attribute
        cardName
        rarity
        skillName
        gachaMessage
        debutOrder
        startDate
        endDate
        maxParameters {
          id
          heart
          technique
          physical
        }
        character {
          data {
            attributes {
              fullNameEnglish
              firstNameEnglish
              unit {
                data {
                  attributes {
                    masterID
                    name
                  }
                }
              }
            }
          }
        }
        skill {
          data {
            attributes {
              masterID
              minRecoveryValue
              maxRecoveryValue
              comboSupportCount
              scoreUpRate
              minSeconds
              maxSeconds
              perfectScoreUpRate
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCardQuery__
 *
 * To run a query within a React component, call `useCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardQuery({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useCardQuery(baseOptions?: Apollo.QueryHookOptions<CardQuery, CardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardQuery, CardQueryVariables>(CardDocument, options);
      }
export function useCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardQuery, CardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardQuery, CardQueryVariables>(CardDocument, options);
        }
export type CardQueryHookResult = ReturnType<typeof useCardQuery>;
export type CardLazyQueryHookResult = ReturnType<typeof useCardLazyQuery>;
export type CardQueryResult = Apollo.QueryResult<CardQuery, CardQueryVariables>;
export const CharacterDocument = gql`
    query Character($characterId: ID, $locale: I18NLocaleCode, $cardsPagination: PaginationArg) {
  character(id: $characterId, locale: $locale) {
    data {
      attributes {
        fullName
        firstName
        firstNameEnglish
        fullNameEnglish
        colorCode
        unit {
          data {
            attributes {
              masterID
              name
            }
          }
        }
        cards(pagination: $cardsPagination) {
          data {
            id
            attributes {
              cardName
              rarity
              attribute
              masterID
            }
          }
        }
        masterID
      }
    }
  }
}
    `;

/**
 * __useCharacterQuery__
 *
 * To run a query within a React component, call `useCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharacterQuery({
 *   variables: {
 *      characterId: // value for 'characterId'
 *      locale: // value for 'locale'
 *      cardsPagination: // value for 'cardsPagination'
 *   },
 * });
 */
export function useCharacterQuery(baseOptions?: Apollo.QueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
      }
export function useCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharacterQuery, CharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharacterQuery, CharacterQueryVariables>(CharacterDocument, options);
        }
export type CharacterQueryHookResult = ReturnType<typeof useCharacterQuery>;
export type CharacterLazyQueryHookResult = ReturnType<typeof useCharacterLazyQuery>;
export type CharacterQueryResult = Apollo.QueryResult<CharacterQuery, CharacterQueryVariables>;
export const MusicsDocument = gql`
    query Musics($locale: I18NLocaleCode, $sort: [String], $pagination: PaginationArg, $filters: MusicFiltersInput) {
  musics(locale: $locale, sort: $sort, pagination: $pagination, filters: $filters) {
    data {
      id
      attributes {
        name
        composer
        masterID
        category
        musicBpm
        unit {
          data {
            attributes {
              name
            }
          }
        }
        charts {
          data {
            id
            attributes {
              level
            }
          }
        }
      }
    }
    meta {
      pagination {
        page
        pageCount
      }
    }
  }
}
    `;

/**
 * __useMusicsQuery__
 *
 * To run a query within a React component, call `useMusicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMusicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMusicsQuery({
 *   variables: {
 *      locale: // value for 'locale'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useMusicsQuery(baseOptions?: Apollo.QueryHookOptions<MusicsQuery, MusicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MusicsQuery, MusicsQueryVariables>(MusicsDocument, options);
      }
export function useMusicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MusicsQuery, MusicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MusicsQuery, MusicsQueryVariables>(MusicsDocument, options);
        }
export type MusicsQueryHookResult = ReturnType<typeof useMusicsQuery>;
export type MusicsLazyQueryHookResult = ReturnType<typeof useMusicsLazyQuery>;
export type MusicsQueryResult = Apollo.QueryResult<MusicsQuery, MusicsQueryVariables>;
export const EventsDocument = gql`
    query Events($filters: EventFiltersInput, $pagination: PaginationArg, $sort: [String], $locale: I18NLocaleCode) {
  events(filters: $filters, pagination: $pagination, sort: $sort, locale: $locale) {
    data {
      id
      attributes {
        masterID
        name
        type
        startDate
        endDate
      }
    }
    meta {
      pagination {
        page
        pageCount
      }
    }
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const MusicDocument = gql`
    query Music($musicId: ID) {
  music(id: $musicId) {
    data {
      id
      attributes {
        name
        readName
        lyrist
        composer
        arranger
        specialUnitName
        category
        musicBpm
        openKey
        isHidden
        hasMovie
        excludeChallenge
        canFairUse
        startDate
        endDate
        masterID
        unused
        unit {
          data {
            attributes {
              name
            }
          }
        }
        musicMix {
          section
          startTime
          startTimeBpm
          endTime
          endTimeBpm
          enableLongMixStart
          enableLongMixEnd
          id
        }
        charts {
          data {
            id
            attributes {
              difficulty
              level
              chartNoteCount {
                section
                count
                id
              }
              masterID
              designer {
                data {
                  attributes {
                    name
                  }
                }
              }
              trends {
                danger
                notes
                scratch
                effect
                technique
              }
              achieveId
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useMusicQuery__
 *
 * To run a query within a React component, call `useMusicQuery` and pass it any options that fit your needs.
 * When your component renders, `useMusicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMusicQuery({
 *   variables: {
 *      musicId: // value for 'musicId'
 *   },
 * });
 */
export function useMusicQuery(baseOptions?: Apollo.QueryHookOptions<MusicQuery, MusicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MusicQuery, MusicQueryVariables>(MusicDocument, options);
      }
export function useMusicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MusicQuery, MusicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MusicQuery, MusicQueryVariables>(MusicDocument, options);
        }
export type MusicQueryHookResult = ReturnType<typeof useMusicQuery>;
export type MusicLazyQueryHookResult = ReturnType<typeof useMusicLazyQuery>;
export type MusicQueryResult = Apollo.QueryResult<MusicQuery, MusicQueryVariables>;
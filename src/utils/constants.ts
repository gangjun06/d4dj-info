import { UnitIcon } from '@/components/Image'
import {
  Enum_Event_Type,
  Enum_Gacha_Category,
  Enum_Stamp_Category,
} from '@/generated/graphql'
import {
  CardSort,
  FindListField,
  FindListType,
  MusicCategory,
  MusicSort,
} from 'models'
import { Translate } from 'next-translate'
import { strToObj } from 'utils'

export type CheckboxListType<T = string> = (t: Translate) => {
  label: string
  value: T
}[]

export const MusicCategoryCheckbox: CheckboxListType = (t: Translate) => [
  {
    label: t('music:category.instrumental'),
    value: MusicCategory.Instrumental,
  },
  {
    label: t('music:category.original'),
    value: MusicCategory.Original,
  },
  {
    label: t('music:category.cover'),
    value: MusicCategory.Cover,
  },
  {
    label: t('music:category.game'),
    value: MusicCategory.Game,
  },
  {
    label: t('music:category.collabo'),
    value: MusicCategory.Collabo,
  },
]

export const EventTypeCheckbox: CheckboxListType<Enum_Event_Type> = (
  t: Translate
) => [
  {
    label: 'raid',
    value: Enum_Event_Type.Raid,
  },
  {
    label: 'Slot',
    value: Enum_Event_Type.Slot,
  },
  {
    label: 'poker',
    value: Enum_Event_Type.Poker,
  },
  {
    label: 'bingo',
    value: Enum_Event_Type.Medley,
  },
  {
    label: 'bingo',
    value: Enum_Event_Type.Bingo,
  },
]

export const MusicSortRadio: CheckboxListType<MusicSort> = (t: Translate) => [
  {
    label: t('common:id'),
    value: MusicSort.ID,
  },
  {
    label: t('common:name'),
    value: MusicSort.Name,
  },
  {
    label: t('common:default_order'),
    value: MusicSort.DefaultOrder,
  },
  {
    label: t('common:start_date'),
    value: MusicSort.StartDate,
  },
  {
    label: t('music:bpm'),
    value: MusicSort.BPM,
  },
]

export const CardOrderRadio: CheckboxListType<CardSort> = (t: Translate) => [
  {
    label: t('common:id'),
    value: CardSort.ID,
  },
  {
    label: t('common:name'),
    value: CardSort.Name,
  },
]

const generateFromEnum = (t: Translate, tKey: string, value: any) =>
  Object.keys(value).map((item) => ({
    label: t(`${tKey}${item.toLowerCase()}`),
    value: item,
  }))

export const GachaCategoryCheckbox: CheckboxListType = (t: Translate) =>
  generateFromEnum(t, 'gacha:categories.', Enum_Gacha_Category)

export const StampCategoryCheckbox: CheckboxListType = (t: Translate) =>
  generateFromEnum(t, 'common:categories.', Enum_Stamp_Category)

export const unitField = (key: string): FindListField => ({
  type: FindListType.Checkbox,
  label: 'common:unit.name',
  name: 'unit',
  options: [
    {
      component: UnitIcon({ unit: 1 }),
      value: '1',
    },
    {
      component: UnitIcon({ unit: 2 }),
      value: '2',
    },
    {
      component: UnitIcon({ unit: 3 }),
      value: '3',
    },
    {
      component: UnitIcon({ unit: 4 }),
      value: '4',
    },
    {
      component: UnitIcon({ unit: 5 }),
      value: '5',
    },
    {
      component: UnitIcon({ unit: 6 }),
      value: '6',
    },
    {
      component: UnitIcon({ unit: 7 }),
      value: '7',
    },
  ],
  customOptionHandler: (value: string[] | string, region: string) =>
    strToObj(key, {
      in: (value as string[]).map((d) => `${d}-${region}`),
    }),
})

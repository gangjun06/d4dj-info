import { Enum_Event_Type } from '@/generated/graphql'
import { Attribute, CardSort, MusicCategory, MusicSort, Unit } from 'models'
import { Translate } from 'next-translate'

export type CheckboxListType<T = string> = (t: Translate) => {
  label: string
  value: T
}[]

export const CardRearityCheckbox: CheckboxListType = (t: Translate) => [
  {
    label: t('card:rarity.1'),
    value: '1',
  },
  {
    label: t('card:rarity.2'),
    value: '2',
  },
  { label: t('card:rarity.3'), value: '3' },
  { label: t('card:rarity.4'), value: '4' },
  {
    label: t('card:rarity.7'),
    value: '7',
  },
]

export const AttributeCheckbox: CheckboxListType<Attribute> = (
  t: Translate
) => [
  {
    label: t('common:attribute.STREET'),
    value: Attribute.Street,
  },
  {
    label: t('common:attribute.PARTY'),
    value: Attribute.Party,
  },
  { label: t('common:attribute.CUTE'), value: Attribute.Cute },
  { label: t('common:attribute.COOL'), value: Attribute.Cool },
  {
    label: t('common:attribute.ELEGANT'),
    value: Attribute.Elegant,
  },
]

export const UnitCheckbox: CheckboxListType<Unit> = (t: Translate) => [
  {
    label: t('common:unit.ha'),
    value: Unit.HA,
  },
  {
    label: t('common:unit.pp'),
    value: Unit.PP,
  },
  { label: t('common:unit.pm'), value: Unit.PM },
  { label: t('common:unit.m4'), value: Unit.MMD },
  {
    label: t('common:unit.ro'),
    value: Unit.LND,
  },
  {
    label: t('common:unit.li'),
    value: Unit.LL,
  },
  {
    label: t('common:unit.etc'),
    value: Unit.Common,
  },
]

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
    label: t('common:sort.id'),
    value: MusicSort.ID,
  },
  {
    label: t('common:sort.name'),
    value: MusicSort.Name,
  },
  {
    label: t('common:sort.default_order'),
    value: MusicSort.DefaultOrder,
  },
  {
    label: t('common:start_date'),
    value: MusicSort.StartDate,
  },
  {
    label: t('common:bpm'),
    value: MusicSort.BPM,
  },
]

export const CardOrderRadio: CheckboxListType<CardSort> = (t: Translate) => [
  {
    label: t('common:sort.id'),
    value: CardSort.ID,
  },
  {
    label: t('common:sort.name'),
    value: CardSort.Name,
  },
]

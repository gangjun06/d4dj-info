import { CardSort, MusicSort } from "@/apollo/gql";
import { Attribute, MusicCategory } from "models";
import { Translate } from "next-translate";

export type CheckboxListType = (t: Translate) => {
  label: string;
  value: string;
}[];

export const CardRearityCheckbox: CheckboxListType = (t: Translate) => [
  {
    label: t("card:rarity.1"),
    value: "1",
  },
  {
    label: t("card:rarity.2"),
    value: "2",
  },
  { label: t("card:rarity.3"), value: "3" },
  { label: t("card:rarity.4"), value: "4" },
  {
    label: t("card:rarity.7"),
    value: "7",
  },
];

export const AttributeCheckbox: CheckboxListType = (t: Translate) => [
  {
    label: t("common:attribute.STREET"),
    value: Attribute.STREET,
  },
  {
    label: t("common:attribute.PARTY"),
    value: Attribute.PARTY,
  },
  { label: t("common:attribute.CUTE"), value: Attribute.CUTE },
  { label: t("common:attribute.COOL"), value: Attribute.COOL },
  {
    label: t("common:attribute.ELEGANT"),
    value: Attribute.ELEGANT,
  },
];

export const UnitCheckbox: CheckboxListType = (t: Translate) => [
  {
    label: t("common:unit.ha"),
    value: "1",
  },
  {
    label: t("common:unit.pp"),
    value: "2",
  },
  { label: t("common:unit.pm"), value: "3" },
  { label: t("common:unit.m4"), value: "4" },
  {
    label: t("common:unit.ro"),
    value: "5",
  },
  {
    label: t("common:unit.li"),
    value: "6",
  },
  {
    label: t("common:unit.etc"),
    value: "50",
  },
];

export const MusicCategoryCheckbox: CheckboxListType = (t: Translate) => [
  {
    label: t("music:category.instrumental"),
    value: MusicCategory.Instrumental,
  },
  {
    label: t("music:category.original"),
    value: MusicCategory.Original,
  },
  {
    label: t("music:category.cover"),
    value: MusicCategory.Cover,
  },
  {
    label: t("music:category.game"),
    value: MusicCategory.Game,
  },
  {
    label: t("music:category.collabo"),
    value: MusicCategory.Collabo,
  },
];

export const MusicOrderRadio: CheckboxListType = (t: Translate) => [
  {
    label: t("common:sort.id"),
    value: MusicSort.ID,
  },
  {
    label: t("common:sort.name"),
    value: MusicSort.Name,
  },
  {
    label: t("common:sort.default_order"),
    value: MusicSort.DefaultOrder,
  },
];

export const CardOrderRadio: CheckboxListType = (t: Translate) => [
  {
    label: t("common:sort.id"),
    value: CardSort.ID,
  },
  {
    label: t("common:sort.name"),
    value: CardSort.Name,
  },
  {
    label: t("common:sort.debut_order"),
    value: CardSort.DebutOrder,
  },
];

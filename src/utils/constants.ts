import { Attribute } from "models";
import { Translate } from "next-translate";

export const CardRearityCheckbox = (t: Translate) => [
  {
    label: t("common:card_rearity.1"),
    value: "1",
  },
  {
    label: t("common:card_rearity.2"),
    value: "2",
  },
  { label: t("common:card_rearity.3"), value: "3" },
  { label: t("common:card_rearity.4"), value: "4" },
  {
    label: t("common:card_rearity.sp"),
    value: "5",
  },
];

export const AttributeCheckbox = (t: Translate) => [
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

export const UnitCheckbox = (t: Translate) => [
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

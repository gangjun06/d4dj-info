export enum Attribute {
  STREET = "STREET",
  PARTY = "PARTY",
  CUTE = "CUTE",
  COOL = "COOL",
  ELEGANT = "ELEGANT",
}

export type Unit = {
  id: number;
  name: string;
  summary: string;
  canTraining: string;
  subColorCode: string;
  shortName: string;
  mainColorCode: string;
  characters: Character[];
};

export type Character = {
  id: number;
  firstName: string;
  firstNameEnglish: string;
  fullName: string;
  fullNameEnglish: string;
  colorCode: string;
  unit?: Unit;
  card?: Card[];
};

export type Card = {
  id: number;
  rarity: number;
  cardName: string;
  attribute: Attribute;
  skillName?: string;
  maxParameters?: number[];
  gachaMessage?: string;
  debutOrder: number;
  character?: Character;
  startDate?: Date;
  endDate?: Date;
};

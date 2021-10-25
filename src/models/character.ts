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
};

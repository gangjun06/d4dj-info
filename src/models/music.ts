import { Unit } from "./character";

export enum MusicCategory {
  Instrumental = "Instrumental",
  Original = "Original",
  Cover = "Cover",
  Game = "Game",
  Collabo = "Collabo",
}

export enum MusicDifficulty {
  Easy = "Easy",
  Mormal = "Normal",
  Hard = "Hard",
  Expert = "Expert",
}

export type Chart = {
  id: number;
  difficulty: string;
  level: number;
  trends: number[];
  achieveId: number;
  overrideLevel: string;
  designerPrimaryKey: number;
  noteCount: number;
  chartDesigner: {
    id: number;
    name: string;
  };
};

export type Music = {
  id: number;
  name: string;
  readName: string;
  lyrist: string;
  composer: string;
  arranger: string;
  specialUnitName: string;
  category: MusicCategory;
  unitPrimaryKey: number;
  defaultOrder: number;
  musicBpm: number;
  openKey: number;
  sectionTrend: string;
  startDate: Date;
  endDate: Date;
  hasMovie: boolean;

  isHidden: boolean;
  excludeChallenge: boolean;
  isTutorial: boolean;
  canFairUse: boolean;

  chart?: Chart[];

  // musicMix?: MusicMix[];

  unit?: Unit;
};

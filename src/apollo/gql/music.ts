import gql from "graphql-tag";
import * as models from "models";
import { PaginationInput } from "./base";

export interface GetMusicListRes {
  music: models.Music[];
}
export interface GetMusicListReq {
  filter: {
    unit?: number[];
    category?: models.MusicCategory[];
  };
  page?: PaginationInput;
}
export const GET_MUSIC_LIST = gql`
  query Query($filter: MusicFilterInput, $page: PaginationInput) {
    music(filter: $filter, page: $page) {
      id
      name
      category
      chart {
        difficulty
        level
      }
    }
  }
`;

export interface GetMusicRes {
  music: models.Music[];
}
export interface GetMusicReq {
  filter: {
    id: number;
  };
}
export const GET_MUSIC_DETAIL = gql`
  query Query($filter: MusicFilterInput) {
    music(filter: $filter) {
      id
      name
      category
      chart {
        id
        difficulty
        level
        trends
      }
    }
  }
`;

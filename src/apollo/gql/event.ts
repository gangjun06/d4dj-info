import { gql } from "@apollo/client";
import { Attribute } from "@pixi/core";
import * as models from "models";
import { PaginationInput, SortInput } from "./base";

export interface GetIndexRes {
  event: models.Event[];
  gacha: models.Gacha[];
}
export interface GetIndexReq {
  eventPage: PaginationInput;
  gachaPage: PaginationInput;
}
export const GET_INDEX_DATA = gql`
  query Query($eventPage: PaginationInput, $gachaPage: PaginationInput) {
    event(page: $eventPage) {
      id
      name
      type
      startDate
      endDate
    }

    gacha(page: $gachaPage) {
      id
      name
      startDate
      category
      endDate
    }
  }
`;

export interface GetEventListRes {
  event: models.Event[];
}
export interface GetEventListReq {
  page?: PaginationInput;
}
export const GET_EVENT_LIST = gql`
  query Query($page: PaginationInput) {
    event(page: $page) {
      id
      name
      type
      startDate
      endDate
    }
  }
`;

export interface GetEventRes {
  event: models.Event[];
}
export interface GetEventReq {
  filter: {
    id: number;
  };
}
export const GET_EVENT_DETAIL = gql`
  query Query($filter: EventFilterInput) {
    event(filter: $filter) {
      id
      name
      type
      episodeCharactersData {
        id
        firstNameEnglish
        fullNameEnglish
      }
      startDate
      endDate
      resultAnnouncementDate
      rankFixStartDate
      receptionCloseDate
      storyUnlockDate
    }
  }
`;

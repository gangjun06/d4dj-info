import { gql } from "@apollo/client";
import { Attribute } from "@pixi/core";
import * as models from "models";
import { PaginationInput, SortInput } from "./base";

export interface GetGachaListRas {
  gacha: models.Gacha[];
}
export interface GetGachaListRaq {
  page?: PaginationInput;
}
export const GET_GACHA_LIST = gql`
  query Query($page: PaginationInput) {
    gacha(page: $page) {
      id
      name
      startDate
      category
      endDate
    }
  }
`;

export interface GetGachaRes {
  gacha: models.Gacha[];
}
export interface GetGachaReq {
  filter: {
    id: number;
  };
}
export const GET_GACHA_DETAIL = gql`
  query Query($page: PaginationInput) {
    gacha(page: $page) {
      id
      name
      startDate
      category
      endDate
      pickUpCards {
        id
        rarity
        cardName
        attribute
      }
    }
  }
`;

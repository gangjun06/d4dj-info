import { gql } from "@apollo/client";
import { Attribute } from "@pixi/core";
import * as models from "models";
import { PaginationInput, SortInput } from "./base";

export enum CardSort {
  id = "id",
  name = "name",
}

export interface GetCardListRes {
  card: models.Card[];
}
export interface GetCardListReq {
  filter: {
    attribute?: Attribute[];
    rairity?: number[];
    unit?: number[];
  };
  sort: SortInput<CardSort>;
  page: PaginationInput;
}
export const GET_CARD_LIST = gql`
  query Query(
    $page: PaginationInput
    $sort: CardSortInput
    $filter: CardFilterInput
  ) {
    card(page: $page, sort: $sort, filter: $filter) {
      id
      rarity
      cardName
      attribute
    }
  }
`;

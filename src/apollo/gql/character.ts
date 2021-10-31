import { gql } from "@apollo/client";
import * as models from "models";
import { PaginationInput, SortInput } from "./base";

export interface GetCharacterRes {
  character: models.Character[];
}
export interface GetCharacterReq {
  filter: {
    id: number;
  };
}
export const GET_CHARACTER_DETAIL = gql`
  query Query($filter: CharacterFilterInput) {
    character(filter: $filter) {
      id
      fullName
      fullNameEnglish
      firstName
      firstNameEnglish
      colorCode
      unit {
        id
        name
      }
      card {
        id
        rarity
        cardName
        attribute
      }
    }
  }
`;

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

// export interface GetCardRes {
//   event: models.Card[];
// }
// export interface GetCardReq {
//   filter: {
//     id: number;
//   };
// }
// export const GET_CARD_DETAIL = gql`
//   query Query($filter: CardFilterInput) {
//     event(filter: $filter) {
//       id
//       rarity
//       eventName
//       attribute
//       character {
//         id
//         fullNameEnglish
//         firstNameEnglish
//         unit {
//           id
//           name
//         }
//       }
//       startDate
//       endDate
//       gachaMessage
//       maxParameters
//       skillName
//       debutOrder
//     }
//   }
// `;

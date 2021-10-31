import { gql } from "@apollo/client";
import { Attribute } from "@pixi/core";
import * as models from "models";
import { PaginationInput, SortInput } from "./base";

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

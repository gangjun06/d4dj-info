import { gql } from "@apollo/client";
import * as models from "models";

export interface GetUnitRes {
  unit: models.Unit[];
}
export const GET_UNIT = gql`
  query Query {
    unit {
      id
      name
      summary
      canTraining
      subColorCode
      shortName
      mainColorCode
      characters {
        id
        firstName
        firstNameEnglish
        fullName
        fullNameEnglish
        colorCode
      }
    }
  }
`;

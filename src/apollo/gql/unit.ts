import { gql } from '@apollo/client'
import * as models from 'models'

export interface GetUnitRes {
  unit: models.Unit[]
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
`

export interface GetUnitEpisodeReq {
  filter: {
    id: number
  }
}

export interface GetUnitEpisodeRes {
  unit: models.Unit[]
}
export const GET_UNIT_EPISODE = gql`
  query Query {
    unit {
      id
      name
      unitEpisode {
        id
        season
        chapterNumber
        episode {
          id
          startDate
          endDate
          title
          summary
        }
      }
    }
  }
`

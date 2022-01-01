import { gql } from '@apollo/client'
import * as models from 'models'

export interface GetCharacterListRes {
  character: models.Character[]
}

export const GET_CHARACTER_LIST = gql`
  query Query {
    character {
      id
      fullNameEnglish
      firstNameEnglish
    }
  }
`

export interface GetCharacterRes {
  character: models.Character[]
}
export interface GetCharacterReq {
  filter: {
    id: number
  }
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
      characterEpisode {
        id
        chapterNumber
        episode {
          id
          title
          startDate
          endDate
        }
      }
    }
  }
`

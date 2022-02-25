import { gql } from '@apollo/client'

export const GET_UNITS = gql`
  query Units($locale: I18NLocaleCode) {
    units(locale: $locale) {
      data {
        id
        attributes {
          name
          masterID
          characters {
            data {
              id
              attributes {
                fullNameEnglish
                firstNameEnglish
                masterID
              }
            }
          }
        }
      }
    }
  }
`

export const GET_CHARACTER = gql`
  query Character(
    $filters: CharacterFiltersInput
    $pagination: PaginationArg
    $locale: I18NLocaleCode
    $cardsPagination2: PaginationArg
  ) {
    characters(filters: $filters, pagination: $pagination, locale: $locale) {
      data {
        attributes {
          fullName
          firstName
          firstNameEnglish
          fullNameEnglish
          colorCode
          unit {
            data {
              attributes {
                masterID
                name
              }
            }
          }
          cards(pagination: $cardsPagination2) {
            data {
              id
              attributes {
                cardName
                rarity
                attribute
                masterID
              }
            }
          }
          masterID
        }
      }
    }
  }
`

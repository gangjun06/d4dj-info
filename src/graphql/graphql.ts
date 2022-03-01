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

export const GET_CARDS = gql`
  query Cards(
    $cardsFilters: CardFiltersInput
    $cardsPagination: PaginationArg
    $sort: [String]
    $cardsLocale: I18NLocaleCode
  ) {
    cards(
      filters: $cardsFilters
      pagination: $cardsPagination
      sort: $sort
      locale: $cardsLocale
    ) {
      meta {
        pagination {
          page
          pageCount
        }
      }
      data {
        id
        attributes {
          rarity
          masterID
          cardName
          attribute
          character {
            data {
              attributes {
                unit {
                  data {
                    id
                    attributes {
                      masterID
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_CARD = gql`
  query Card($cardId: ID, $locale: I18NLocaleCode) {
    card(id: $cardId, locale: $locale) {
      data {
        id
        attributes {
          masterID
          attribute
          cardName
          rarity
          skillName
          gachaMessage
          debutOrder
          startDate
          endDate
          maxParameters {
            id
            heart
            technique
            physical
          }
          character {
            data {
              attributes {
                fullNameEnglish
                firstNameEnglish
                unit {
                  data {
                    attributes {
                      masterID
                      name
                    }
                  }
                }
              }
            }
          }
          skill {
            data {
              attributes {
                masterID
                minRecoveryValue
                maxRecoveryValue
                comboSupportCount
                scoreUpRate
                minSeconds
                maxSeconds
                perfectScoreUpRate
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
    $characterId: ID
    $locale: I18NLocaleCode
    $cardsPagination: PaginationArg
  ) {
    character(id: $characterId, locale: $locale) {
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
          cards(pagination: $cardsPagination) {
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

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

export const GET_MUSICS = gql`
  query Musics(
    $locale: I18NLocaleCode
    $sort: [String]
    $pagination: PaginationArg
    $filters: MusicFiltersInput
  ) {
    musics(
      locale: $locale
      sort: $sort
      pagination: $pagination
      filters: $filters
    ) {
      data {
        id
        attributes {
          name
          composer
          masterID
          category
          musicBpm
          unit {
            data {
              attributes {
                name
              }
            }
          }
          charts {
            data {
              id
              attributes {
                level
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageCount
        }
      }
    }
  }
`

export const GET_EVENTS = gql`
  query Events(
    $filters: EventFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $locale: I18NLocaleCode
  ) {
    events(
      filters: $filters
      pagination: $pagination
      sort: $sort
      locale: $locale
    ) {
      data {
        id
        attributes {
          masterID
          name
          type
          startDate
          endDate
        }
      }
      meta {
        pagination {
          page
          pageCount
        }
      }
    }
  }
`

export const GET_MUSIC = gql`
  query Music($musicId: ID) {
    music(id: $musicId) {
      data {
        id
        attributes {
          name
          readName
          lyrist
          composer
          arranger
          specialUnitName
          category
          musicBpm
          openKey
          isHidden
          hasMovie
          excludeChallenge
          canFairUse
          startDate
          endDate
          masterID
          unused
          unit {
            data {
              attributes {
                name
              }
            }
          }
          musicMix {
            section
            startTime
            startTimeBpm
            endTime
            endTimeBpm
            enableLongMixStart
            enableLongMixEnd
            id
          }
          charts {
            data {
              id
              attributes {
                difficulty
                level
                chartNoteCount {
                  section
                  count
                  id
                }
                masterID
                designer {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                trends {
                  danger
                  notes
                  scratch
                  effect
                  technique
                }
                achieveId
              }
            }
          }
        }
      }
    }
  }
`

export const GET_GACHAS = gql`
  query Gachas(
    $filters: GachaFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $locale: I18NLocaleCode
  ) {
    gachas(
      filters: $filters
      pagination: $pagination
      sort: $sort
      locale: $locale
    ) {
      meta {
        pagination {
          page
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          masterID
          startDate
          endDate
          category
          name
        }
      }
    }
  }
`

export const GET_GACHA = gql`
  query Gacha($gachaId: ID) {
    gacha(id: $gachaId) {
      data {
        id
        attributes {
          localizations {
            data {
              id
              attributes {
                locale
              }
            }
          }
          type
          pickUpCards {
            data {
              attributes {
                cardName
                rarity
                attribute
                masterID
              }
              id
            }
          }
          summary
          masterID
          startDate
          endDate
          note
          detail
          category
          name
        }
      }
    }
  }
`

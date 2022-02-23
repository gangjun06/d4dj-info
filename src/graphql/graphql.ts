import { gql } from '@apollo/client'

export const GET_UNITS = gql`
  query Units($locale: I18NLocaleCode) {
    units(locale: $locale) {
      data {
        attributes {
          name
          characters {
            data {
              attributes {
                firstName
                fullName
              }
            }
          }
        }
      }
    }
  }
`

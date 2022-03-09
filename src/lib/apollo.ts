import { ApolloClient, FieldPolicy, InMemoryCache } from '@apollo/client'

const concatPagination: FieldPolicy = {
  keyArgs: false,
  merge(existing = { data: [] }, incoming: any, {}) {
    return {
      ...incoming,
      data: [...existing.data, ...incoming.data],
    }
  },
}

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cards: concatPagination,
          musics: concatPagination,
          events: concatPagination,
        },
      },
    },
  }),
})

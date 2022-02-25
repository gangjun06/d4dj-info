import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cards: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming, {}) {
              console.info(existing)
              console.info(incoming)
              return {
                ...incoming,
                data: [...existing.data, ...incoming.data],
              }
            },
          },
        },
      },
    },
  }),
})

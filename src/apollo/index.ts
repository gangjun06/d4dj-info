import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + "/graphql",
  cache: new InMemoryCache(),
});

import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env);

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + "/graphql",
  cache: new InMemoryCache(),
});

import type { AppProps } from "next/app";
import "@/assets/styles.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

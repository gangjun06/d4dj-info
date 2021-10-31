import type { AppProps } from "next/app";
import "@/assets/styles.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as ga from "lib/ga";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

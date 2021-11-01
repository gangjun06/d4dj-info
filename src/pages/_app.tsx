import type { AppProps } from "next/app";
import "@/assets/styles.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as ga from "lib/ga";
import setLanguage from "next-translate/setLanguage";
import NextNProgress from "nextjs-progressbar";

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

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <NextNProgress color={"#6366f1"} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

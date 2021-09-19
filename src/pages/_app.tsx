import type { AppProps } from "next/app";
import Head from "next/head";
import "@/assets/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>D4DJ.info</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

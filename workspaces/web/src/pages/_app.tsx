import '@/assets/styles.css'
import { SettingProvider } from '@/components/Elements/Setting'
import setLanguage from 'next-translate/setLanguage'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (lang) {
      setLanguage(lang)
    }
  }, [])

  return (
    <>
      <Head>
        <Head>
          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEB_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_SRC}
          ></script>
        </Head>
      </Head>
      <SettingProvider>
        {/*@ts-ignore*/}
        <NextNProgress color={'#6366f1'} />
        <ToastContainer position="top-center" />
        {/*@ts-ignore*/}
        <Component {...pageProps} />
      </SettingProvider>
    </>
  )
}
export default MyApp

/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void
  }
}

export const pageview = (url: any) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string, {
    page_path: url,
  })
}

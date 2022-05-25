import Head from 'next/head'

export default function Live2DHeader() {
  return (
    <Head>
      {/* eslint-disable-next-line @next/next/no-sync-scripts*/}
      <script src="/live2dcubismcore.min.js" />
      {/* eslint-disable-next-line @next/next/no-sync-scripts*/}
      <script src="/live2d.min.js" />
    </Head>
  )
}

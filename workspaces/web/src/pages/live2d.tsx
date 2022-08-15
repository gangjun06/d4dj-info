import Live2DHeader from '@/components/Pages/Live2D/Live2DHeader'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Live2DView = dynamic(() => import('@/components/Pages/Live2D'), {
  ssr: false,

  // eslint-disable-next-line react/display-name
  loading: () => <Loading />,
})

function Loading() {
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => setShow(true), 5000)
  }, [])
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {show && (
        <div className="text-black">
          If loading continues, please close the page and try again
        </div>
      )}
    </div>
  )
}

export default function Live2D() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Live2D Viewer | D4DJ.info</title>
      </Head>
      <Live2DHeader />

      <div
        style={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Live2DView urlData={router.query.data} />
      </div>
    </>
  )
}

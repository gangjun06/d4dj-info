import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export const useRouterState = (url: string) => {
  const router = useRouter()
  const [routerState, setRouterState] = useState<string | null>(null)

  const resetRouterState = useCallback(() => {
    setRouterState(null)
    router.replace(url, url, { shallow: true })
  }, [router, url])

  useEffect(() => {
    const find = router.asPath.match(/\d+-\w{2}/)
    if (find && find.length) setRouterState(find[0])
  }, [router.asPath])

  return { resetRouterState, routerState, setRouterState }
}

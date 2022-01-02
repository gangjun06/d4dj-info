import { useEffect, useState } from 'react'

export const useDelayUnmount = <T>(
  inputData: T | null,
  isMounted: boolean,
  delayTime: number
) => {
  const [showDiv, setShowDiv] = useState(false)
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isMounted && !showDiv) {
      setData(inputData)
      setShowDiv(true)
    } else if (!isMounted && showDiv) {
      setShowDiv(false)
      timeoutId = setTimeout(() => setData(null), delayTime) //delay our unmount
    }
    return () => clearTimeout(timeoutId) // cleanup mechanism for effects , the use of setTimeout generate a sideEffect
  }, [isMounted, delayTime, showDiv, data, inputData])
  return [data, showDiv] as [T | null, boolean]
}

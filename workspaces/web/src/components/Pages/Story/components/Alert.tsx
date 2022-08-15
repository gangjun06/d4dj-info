import { useWindowSize } from '@react-hook/window-size'
import useTranslation from 'next-translate/useTranslation'
import { Fragment, useEffect, useState } from 'react'

export const Alert = () => {
  const { t } = useTranslation()
  const [width, height] = useWindowSize()
  const [reloadAlert, setReloadAlert] = useState<boolean>(false)

  useEffect(() => {
    if (height > width) {
      setReloadAlert(true)
    }
  }, [width, height])

  if (reloadAlert) {
    return (
      <div className="absolute z-20 left-0 top-0 w-full h-full flex flex-col opacity-80 backdrop-blur text-center bg-black/70 items-center justify-center text-white">
        {t('common:rotate')
          .split('\n')
          .map((item, index) => (
            <Fragment key={index}>
              {item}
              <br />
            </Fragment>
          ))}
      </div>
    )
  }
  return <></>
}

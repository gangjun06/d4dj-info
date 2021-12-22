import { useWindowSize } from '@react-hook/window-size'
import useTranslation from 'next-translate/useTranslation'
import { Live2DModel } from 'pixi-live2d-display'
import * as PIXI from 'pixi.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { HiCog } from 'react-icons/hi'
import StoryProvider, { StoryContext } from './context'
import { Setting } from './setting'

type props = {
  urlData: string | string[] | undefined
}

function StoryViewContent({ urlData }: props) {
  const canvasWrapper = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { background, setApp } = useContext(StoryContext)
  const [width, height] = useWindowSize()
  const [isShown, setIsShown] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText(true)
    }, 3000)
    const app = new PIXI.Application({
      backgroundAlpha: 0,
      autoStart: true,
      width,
      height,
    })
    Live2DModel.registerTicker(PIXI.Ticker)
    app.view.setAttribute(
      'style',
      `${app.view.getAttribute('style')}position: absolute;`
    )
    canvasWrapper.current?.appendChild(app.view)
    setApp(app)

    return () => {
      if (canvasWrapper.current?.firstChild) {
        canvasWrapper.current?.removeChild(canvasWrapper.current.firstChild)
      }
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Setting isShown={isShown} onClose={() => setIsShown(false)} />
      {displayText && (
        <div className="absolute mt-5 ml-5 text-2xl font-bold">
          {t('common:adblock')}
        </div>
      )}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover"
        style={{
          backgroundImage: background ? `url("${background}")` : '',
        }}
      ></div>
      <div
        ref={canvasWrapper}
        style={{
          width: '100%',
          height: '100%',
        }}
      ></div>
      <div className="absolute right-0 top-0">
        <button className="my-3 mr-4 btn" onClick={() => setIsShown(true)}>
          <HiCog /> {t('common:setting')}
        </button>
      </div>
    </>
  )
}

export default function Live2DView(props: props) {
  return (
    <StoryProvider>
      <StoryViewContent {...props} />
    </StoryProvider>
  )
}

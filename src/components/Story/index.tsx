import { useWindowSize } from '@react-hook/window-size'
import { SceWords } from 'models/story'
import useTranslation from 'next-translate/useTranslation'
import { InternalModel, Live2DModel } from 'pixi-live2d-display'
import * as PIXI from 'pixi.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { HiCog } from 'react-icons/hi'
import { delay } from 'utils'
import { SubTitle, Title } from './components/Title'
import StoryProvider, { StoryContext } from './context'
import { Setting } from './setting'
import { loadModels } from './utils'

type props = {
  urlData: string | string[] | undefined
}

const AdBlock = () => {
  const [displayText, setDisplayText] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText(true)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (displayText)
    return (
      <div className="absolute mt-5 ml-5 text-2xl font-bold">
        {t('common:adblock')}
      </div>
    )
  return <></>
}

function StoryViewContent({ urlData }: props) {
  const canvasWrapper = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { storyData, storyMeta, background, setApp, app } =
    useContext(StoryContext)
  const [width, height] = useWindowSize()
  const [isShown, setIsShown] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(-1)
  const [models, setModels] = useState<Live2DModel<InternalModel>[]>()
  const [title, setTitle] = useState<string | null>(null)
  const [subTitle, setSubTitle] = useState<string | null>(null)

  const canvasClick = () => setIndex((index) => index + 1)
  const keyDown = (e: KeyboardEvent) =>
    e.key === ' ' && setIndex((index) => index + 1)

  useEffect(() => {
    console.log(storyData)
    if (!storyData || index == -1 || index > storyData.length) return
    ;(async () => {
      if (title) {
        setTitle(null)
        await delay(200)
      }
      if (subTitle) {
        setSubTitle(null)
        await delay(200)
      }
      const data = storyData[index]
      const settings = data.settings
      settings.forEach(({ name, value, args }) => {
        if (name === SceWords.Title) setTitle(value)
        else if (name === SceWords.SubTitle) setSubTitle(value)
      })
    })()
  }, [index, storyData])

  useEffect(() => {
    const canvas = canvasWrapper.current
    canvas?.addEventListener('click', canvasClick)
    document.addEventListener('keydown', keyDown)
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
    canvas?.appendChild(app.view)
    setApp(app)

    return () => {
      if (canvas) {
        canvas.innerHTML = ''
        canvas.removeEventListener('click', canvasClick)
      }
      document.removeEventListener('keydown', keyDown)
    }
  }, [])

  useEffect(() => {
    if (storyMeta)
      loadModels(Array.from(storyMeta.live2dList.values())).then((res) => {
        setModels(res)
      })
  }, [storyMeta])

  return (
    <>
      <Setting isShown={isShown} onClose={() => setIsShown(false)} />
      <AdBlock />
      <Title title={title} />
      <SubTitle subTitle={subTitle} />

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

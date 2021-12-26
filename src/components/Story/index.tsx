import { useWindowSize } from '@react-hook/window-size'
import { SceValues, SceWords } from 'models/story'
import useTranslation from 'next-translate/useTranslation'
import { InternalModel, Live2DModel } from 'pixi-live2d-display'
import * as PIXI from 'pixi.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { HiCog } from 'react-icons/hi'
import { delay } from 'utils'
import { Dialogue } from './components/Dialogue'
import { Fade } from './components/Fade'
import { SubTitle, Title } from './components/Title'
import StoryProvider, { StoryContext } from './context'
import { Setting } from './setting'
import { loadModel } from './utils'

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
  const { t } = useTranslation()
  const {
    storyData,
    storyMeta,
    background,
    setApp,
    setBackground,
    playMusic,
    stopMusic,
    speaker,
    setSpeaker,
    text,
    setText,
  } = useContext(StoryContext)

  const canvasWrapper = useRef<HTMLDivElement>(null)
  const musicRef = useRef<HTMLAudioElement>(null)

  const [width, height] = useWindowSize()
  const [isShown, setIsShown] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(-1)
  const [models, setModels] =
    useState<Map<string, Live2DModel<InternalModel>>>()
  const [title, setTitle] = useState<string | null>(null)
  const [subTitle, setSubTitle] = useState<string | null>(null)

  const [fade, setFade] = useState<SceValues | null>(null)

  const canvasClick = () => setIndex((index) => index + 1)
  const keyDown = (e: KeyboardEvent) =>
    e.key === ' ' && setIndex((index) => index + 1)

  useEffect(() => {
    if (!storyData || index === -1 || index > storyData.length) return
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
      if (data.text !== '') {
        setText(data.text)
        return
      } else if (text !== '') {
        setText(null)
      }
      settings.forEach(async ({ name, value, args }) => {
        if (name === SceWords.Title) {
          setTitle(value)
          return
        } else if (name === SceWords.SubTitle) {
          setSubTitle(value)
          return
        } else if (name === SceWords.Background) {
          setBackground(value)
          await delay(100)
        } else if (name === SceWords.Speaker) setSpeaker(value)
        else if (name === SceWords.SoundBGM)
          playMusic(value, (args.get(SceWords.Volume) || 100) as number)
        else if (name === SceWords.SoundBGMStop) stopMusic()
        else if (name === SceWords.FadeIn) {
          setFade(value as SceValues)
          await delay(500)
        } else if (name === SceWords.FadeOut) {
          setFade(null)
          await delay(500)
        }
        setIndex((index) => index + 1)
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
    const map = new Map<string, Live2DModel<InternalModel>>()
    if (storyMeta) {
      Array.from(storyMeta.live2dList.keys()).forEach(async (item) => {
        const name = storyMeta.live2dList.get(item)
        if (name) {
          const model = await loadModel(name)
          map.set(item, model)
        }
      })
    }
  }, [storyMeta])

  return (
    <>
      <audio ref={musicRef} />
      <Setting isShown={isShown} onClose={() => setIsShown(false)} />
      <AdBlock />
      <Title title={title} />
      <SubTitle subTitle={subTitle} />
      <Fade color={fade} />
      <Dialogue name={speaker} text={text} />

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

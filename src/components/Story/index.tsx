import { useWindowSize } from '@react-hook/window-size'
import axios from 'axios'
import { SceValues, SceWords, StoryNext } from 'models/story'
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
  data?: string
  next?: StoryNext
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
        {/* {t('common:adblock')} */}
      </div>
    )
  return <></>
}

function StoryViewContent({ data: openFileName, next }: props) {
  const { t } = useTranslation()
  const {
    storyData,
    storyMeta,
    background,
    app,
    setApp,
    setBackground,
    playMusic,
    stopMusic,
    speaker,
    setSpeaker,
    text,
    setText,
    setNext,
    loadStoryData,
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

  const [charaStack, setCharaStack] = useState<Map<any, string>>(new Map())

  const [animationTimeout, setAnimationTimeout] = useState<NodeJS.Timeout>()

  const canvasClick = () => setIndex((index) => index + 1)
  const keyDown = (e: KeyboardEvent) =>
    e.key === ' ' && setIndex((index) => index + 1)

  const doAnimation = async (animation: string, cur: number, model: any) => {
    if (cur === 0 && animationTimeout) clearTimeout(animationTimeout)
    const splited = animation.split(',')
    const item = splited[cur]
    const s = item.split('@')
    model.internalModel.motionManager.stopAllMotions()
    await model.internalModel.motionManager.startMotion(
      '',
      model.internalModel.motionManager.settings.motions[''].findIndex(
        (item: { File: string }) => item.File.includes(s[0])
      )
    )
    s[1] &&
      (await model.internalModel.motionManager.expressionManager.setExpression(
        s[1]
      ))
    if (splited.length - 1 > cur) {
      setAnimationTimeout(
        setTimeout(() => doAnimation(animation, cur + 1, model), 2000)
      )
    }
  }

  useEffect(() => {
    if (!storyData || index === -1) return
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
      if (!data) {
        reset()
        return
      }
      console.log(data)
      const settings = data.settings
      const audio = musicRef.current

      if (data.text !== '') {
        setText(data.text)
      } else if (text !== '') {
        setText(null)
        if (audio && audio.src !== '' && !audio.paused) {
          musicRef.current.pause()
        }
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
        } else if (name === SceWords.Live2dCharaVoice) {
          const voiceName = args.get(SceWords.VoiceName)
          if (typeof voiceName === 'string')
            if (musicRef.current) {
              musicRef.current.src = `https://asset.d4dj.info/plain/adv/ondemand/voice/${voiceName}.mp3`
              await musicRef.current.play()
            }
        } else if (name === SceWords.Live2dCharaDisplay) {
          const model: any = models?.get(value)
          if (model && app) {
            const animation = args.get(SceWords.Animation)
            const position = args.get(SceWords.Position)
            const chara = charaStack.get(position)

            const addModel = () => {
              if (typeof position === 'string') {
                if (position === SceValues.Left)
                  model.x = 0.35 * app!.renderer.width
                else if (position === SceValues.Right)
                  model.x = 0.65 * app!.renderer.width
                else if (position === SceValues.Center)
                  model.x = 0.5 * app!.renderer.width
                if (position === '1') model.x = 0.5 * app!.renderer.width
                else if (position === '2') model.x = 0.35 * app!.renderer.width
                else if (position === '3') model.x = 0.65 * app!.renderer.width
                else if (position === '4') model.x = 0.95 * app!.renderer.width
              } else {
                model.x = 0.5 * app!.renderer.width
              }
              model.y = 0.7 * app!.renderer.height
              model.rotation = Math.PI
              model.skew.x = Math.PI
              model.scale.set(0.3)
              model.anchor.set(0.5, 0.5)

              model && app?.stage.addChild(model)
            }

            if (chara) {
              if (chara !== value) {
                const fileName = storyMeta?.live2dList.get(chara)
                const index = app!.stage.children.findIndex(
                  ({ internalModel: im }: any) =>
                    im.settings && im.settings.name === fileName
                )
                index >= 0 && app!.stage.removeChildAt(index)
                addModel()
              }
            } else addModel()

            setCharaStack((stack) => {
              stack.set(position, value)
              return stack
            })

            if (typeof animation === 'string') {
              doAnimation(animation, 0, model)
            }
          }
        } else if (name === SceWords.Live2dCharaAnimation) {
          const model = models?.get(value)
          const animation = args.get(SceWords.Animation)
          if (model && typeof animation === 'string') {
            doAnimation(animation, 0, model)
          }
        } else if (name === SceWords.Live2dCharaHide) {
          app?.stage.removeChildren()
          setCharaStack((stack) => {
            stack.clear()
            return stack
          })
        }
        if (data.text === '') setIndex((index) => index + 1)
      })
    })()
  }, [index, storyData])

  useEffect(() => {
    if (next) setNext(next)
  }, [next])

  useEffect(() => {
    if (openFileName)
      (async () => {
        const res = await axios.get(
          `https://asset.d4dj.info/adv/ondemand/scenario/sce_${openFileName}.sce`
        )
        loadStoryData(res.data)
      })()

    const canvas = canvasWrapper.current
    canvas?.addEventListener('click', canvasClick)
    document.addEventListener('keydown', keyDown)

    // Application.registerPlugin(PIXI.TickerPlugin)
    Live2DModel.registerTicker(PIXI.Ticker)
    const app = new PIXI.Application({
      backgroundAlpha: 0,
      autoStart: true,
      width,
      height,
    })

    app.view.setAttribute(
      'style',
      `${app.view.getAttribute('style')}position: absolute;`
    )
    canvas?.appendChild(app.view)
    // const filter = new PIXI.filters.ColorMatrixFilter()
    // filter.brightness(0.6, false)
    // app.stage.filters = [filter]
    setApp(app)

    return () => {
      if (canvas) {
        canvas.innerHTML = ''
        canvas.removeEventListener('click', canvasClick)
      }
      document.removeEventListener('keydown', keyDown)
    }
  }, [])

  const reset = () => {
    setIndex(-1)
    setTitle(null)
    setSubTitle(null)
    setSpeaker('')
    setText(null)
    setAnimationTimeout(undefined)
    setBackground('default')
    setFade(null)
    stopMusic()
    app?.stage.removeChildren()
  }

  useEffect(() => {
    const map = new Map<string, Live2DModel<InternalModel>>()
    if (storyMeta) {
      reset()
      Array.from(storyMeta.live2dList.keys()).forEach(async (item) => {
        const name = storyMeta.live2dList.get(item)
        if (name) {
          const model = await loadModel(name)
          map.set(item, model)
        }
      })
    }
    setModels(map)
  }, [storyMeta])

  return (
    <>
      <audio ref={musicRef} autoPlay />
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
          <HiCog size={22} />
          {/*t('common:setting')*/}
        </button>
      </div>
      <div>
        {index === -1 && (
          <div className="absolute z-20">Click Setting to play</div>
        )}
      </div>
    </>
  )
}

export default function StoryView(props: props) {
  return (
    <>
      <StoryProvider>
        <StoryViewContent {...props} />
      </StoryProvider>
    </>
  )
}

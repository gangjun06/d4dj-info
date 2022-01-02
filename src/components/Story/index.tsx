import { useWindowSize } from '@react-hook/window-size'
import axios from 'axios'
import { SceValues, SceWords, StoryNext } from 'models/story'
import useTranslation from 'next-translate/useTranslation'
import { InternalModel, Live2DModel } from 'pixi-live2d-display'
import * as PIXI from 'pixi.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { delay } from 'utils'
import { TempModal } from '../Basic'
import { AdBlockAlert } from '../Util/AdBlockAlert'
import { Alert } from './components/Alert'
import { Background } from './components/Background'
import { Dialogue } from './components/Dialogue'
import { Fade } from './components/Fade'
import { SubTitle, Title } from './components/Title'
import StoryProvider, { StoryContext } from './context'
import { Setting } from './setting'
import { getModelUrl, getPosition, setModelData } from './utils'

type props = {
  data?: {
    name?: string
    hasVoice?: boolean
  }
  next?: StoryNext
}

function StoryViewContent({ data, next }: props) {
  const { name: openFileName } = data || {}
  const { t } = useTranslation()
  const {
    storyData,
    storyMeta,
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
    playSE,
  } = useContext(StoryContext)

  const canvasWrapper = useRef<HTMLDivElement>(null)
  const musicRef = useRef<HTMLAudioElement>(null)

  const [width, height] = useWindowSize()
  const [index, setIndex] = useState<number>(-1)
  const [models, setModels] = useState<Map<
    string,
    Live2DModel<InternalModel>
  > | null>(null)
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
    if (!storyData || index === -1 || !models) return
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
        } else if (name === SceWords.Delay) {
          try {
            await delay(parseFloat(value) * 1000)
          } catch {}
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
        } else if (name === SceWords.SoundSE) {
          const waitStop = args.get(SceWords.WaitStop)
          if (waitStop && waitStop === SceValues.True) {
            await playSE!(value)
            await delay(150)
          } else playSE!(value)
        } else if (name === SceWords.Live2dCharaFilm) {
          const film = args.get(SceWords.Film)
          if (
            value === SceValues.FilmAll &&
            film &&
            film === SceValues.FilmDarkPlace
          ) {
            const filter = new PIXI.filters.ColorMatrixFilter()
            filter.brightness(0.6, false)
            app!.stage.filters = [filter]
          } else app!.stage.filters = []
        } else if (name === SceWords.Live2dCharaVoice) {
          let voiceName = args.get(SceWords.VoiceName)
          if (typeof voiceName === 'string')
            try {
              if (musicRef.current) {
                if (voiceName.startsWith('vo_')) {
                  voiceName = `https://asset.d4dj.info/plain/adv/ondemand/voice/sce_${/\d+(?=_)/.exec(
                    voiceName
                  )}-${voiceName}.mp3`
                }
                musicRef.current.src = voiceName
                await musicRef.current.play()
              }
            } catch {}
        } else if (name === SceWords.Live2dCharaDisplay) {
          let model: any = models?.get(value)
          if (model && app) {
            const animation = args.get(SceWords.Animation)
            const position = args.get(SceWords.Position)
            const chara = charaStack.get(position)

            const addModel = () => {
              model = setModelData(
                model,
                position,
                app!.renderer.width,
                app!.renderer.height
              )
              app?.stage.addChild(model)
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

            if (typeof animation === 'string') doAnimation(animation, 0, model)
          }
        } else if (name === SceWords.Live2dCharaMove) {
          const position = args.get(SceWords.Position)
          console.log('move')
          const model: any = models?.get(value)
          if (model) {
            model.x = getPosition(position, app!.renderer.width)
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
    app!.stage.filters = []
    app?.stage.removeChildren()
  }

  useEffect(() => {
    const map = new Map<string, Live2DModel<InternalModel>>()
    if (storyMeta) {
      reset()
      Array.from(storyMeta.live2dList.keys()).forEach(async (item) => {
        const name = storyMeta.live2dList.get(item)
        if (name) {
          const model: any = await Live2DModel.from(getModelUrl(name), {})
          map.set(item, model)
        }
      })
    }
    setModels(map)
  }, [storyMeta])

  return (
    <>
      <audio ref={musicRef} autoPlay />
      <Background />
      <Title title={title} />
      <SubTitle subTitle={subTitle} />
      <Fade color={fade} />
      <Dialogue name={speaker} text={text} />
      <TempModal id="story-data-alert">{t('common:data_alert')}</TempModal>
      <Setting />
      <Alert />
      <AdBlockAlert />

      <div
        ref={canvasWrapper}
        style={{
          width: '100%',
          height: '100%',
        }}
      ></div>
      {index === -1 && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/70 backdrop-blur rounded px-3 py-2">
          {`Click Screen ${width > 1000 ? 'or Press space ' : ''}to play`}
        </div>
      )}
    </>
  )
}

export default function StoryView(props: props) {
  return (
    <StoryProvider>
      <StoryViewContent {...props} />
    </StoryProvider>
  )
}

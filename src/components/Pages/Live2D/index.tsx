import { useWindowSize } from '@react-hook/window-size'
import { Live2DModel } from 'pixi-live2d-display'
import * as PIXI from 'pixi.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { HiCog } from 'react-icons/hi'
import { toast } from 'react-toastify'
import Live2DProvider, { Live2DContext } from './context'
import { Setting } from './setting'
import { dragable } from './utils'

type props = {
  urlData: string | string[] | undefined
}

function Live2DViewContent({ urlData }: props) {
  const canvasWrapper = useRef<HTMLDivElement>(null)
  const {
    app,
    background,
    dragable: dragableState,
    setModels,
  } = useContext(Live2DContext)
  const [width, height] = useWindowSize()
  const [isShown, setIsShown] = useState<boolean>(false)

  useEffect(() => {
    const canvas = canvasWrapper.current
    app!.current = new PIXI.Application({
      backgroundAlpha: 0,
      autoStart: true,
      width,
      height,
    })
    Live2DModel.registerTicker(PIXI.Ticker)
    app!.current.view.setAttribute(
      'style',
      `${app!.current.view.getAttribute('style')}position: absolute;`
    )
    canvas?.appendChild(app!.current.view)

    return () => {
      if (canvas?.firstChild) {
        canvas.removeChild(canvas.firstChild)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (urlData && app)
      (async () => {
        try {
          const dataStr = Buffer.from(
            (urlData as string).replaceAll(' ', '+'),
            'base64'
          )
          const data: {
            name: string
            model: string
            scale: number
            x: number
            y: number
          }[] = JSON.parse(dataStr.toString())

          const models: any[] = []
          for (const item of data) {
            const url = `https://cdn.d4dj.info/jp/AssetBundles/Live2D/${item.model}/${item.model}.model3.json`
            const model: any = await Live2DModel.from(url, {})
            models.push(model)
            const renderer = app.current!.renderer
            model.x = item.x * renderer.view.width
            model.y = item.y * renderer.height
            model.scale.set(item.scale, item.scale)
            model.anchor.set(0.5, 0.5)

            model.dragable = dragableState

            dragable(model)
            app.current!.stage.addChild(model)
          }

          setModels(() => {
            return data.map((item, index) => ({
              name: item.name,
              data: models[index],
            }))
          })
          toast.success(`Successfully imported models`)
        } catch (e) {
          console.error(e)
          toast.warning(`Error loading models`)
        }
      })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlData, app])

  return (
    <>
      <Setting isShown={isShown} onClose={() => setIsShown(false)} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundImage: background ? `url("${background}")` : '',
        }}
      ></div>
      <div
        ref={canvasWrapper}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      ></div>
      <div className="absolute right-0 top-0">
        <button className="my-3 mr-4 btn" onClick={() => setIsShown(true)}>
          <HiCog size={22} />
        </button>
      </div>
    </>
  )
}

export default function Live2DView(props: props) {
  return (
    <Live2DProvider>
      <Live2DViewContent {...props} />
    </Live2DProvider>
  )
}

import { SideOver } from '@/components/Basic'
import { useWindowSize } from '@react-hook/window-size'
import React, { useCallback, useContext, useEffect } from 'react'
import { createLive2DShare, Live2DShare } from 'utils/live2d'
import { Live2DContext } from '../context'
import { TabConfig } from './tabConfig'
import { TabModel } from './tabModel'

type props = {
  isShown: boolean
  onClose: () => void
}

export function Setting({ isShown, onClose }: props) {
  const { dragable, models, setModels, app } = useContext(Live2DContext)
  const [width, height] = useWindowSize()

  useEffect(() => {
    setModels((item) => {
      item.forEach((model) => {
        model.data.dragable = dragable
      })
      return item
    })
  }, [dragable, setModels])

  const share = useCallback(() => {
    const result: Live2DShare[] = models.map((item) => {
      const index = app!.stage.children.findIndex(
        ({ internalModel: im }: any) =>
          im.settings && im.settings.name === item.name
      )
      const model: any = app?.stage.children[index]

      return {
        model: (model.tag as string)
          .replace('Live2DModel(', '')
          .replace(')', ''),
        scale: model.scale._x,
        x: (model.x / width).toFixed(4),
        y: (model.y / height).toFixed(4),
        name: item.name,
      }
    })

    const url = `https://d4dj.info/${createLive2DShare(result)}`
    try {
      const shareData = {
        title: 'D4DJ.Info Live2D Share',
        text: '',
        url,
      }
      navigator.share(shareData)
    } catch (e) {
      navigator.clipboard.writeText(url)
      // toaster.success(`Share URL copied`)
    }
  }, [models, width, height])

  return (
    <SideOver
      open={isShown}
      onClose={onClose}
      title="Live2D Config"
      footer={
        <div className="btn btn-outline btn-sm" onClick={share}>
          Share
        </div>
      }
    >
      <TabConfig />
      <TabModel />
    </SideOver>
  )
}

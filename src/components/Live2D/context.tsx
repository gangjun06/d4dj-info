import * as PIXI from 'pixi.js'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

type ContextType = {
  background: string
  setBackground: (url: string) => void
  app?: PIXI.Application
  setApp: (app: PIXI.Application) => void
  models: { name: string; data: any }[]
  setModels: Dispatch<SetStateAction<{ name: string; data: any }[]>>
  dragable: boolean
  setDragable: Dispatch<SetStateAction<boolean>>
  configIndex: number
  setConfigIndex: Dispatch<SetStateAction<number>>
}

const defaultState: ContextType = {
  background:
    'https://asset.d4dj.info/jp/adv/ondemand/background/bg_adv_10012.jpg',
  setBackground: () => {},
  setApp: () => {},
  models: [],
  setModels: () => {},
  dragable: false,
  setDragable: () => {},
  configIndex: 0,
  setConfigIndex: () => {},
}

export const Live2DContext = createContext<ContextType>(defaultState)

function Live2DProvider({ children }: { children: React.ReactElement }) {
  const [background, setBackground] = useState<string>(defaultState.background)
  const [dragable, setDragable] = useState<boolean>(defaultState.dragable)
  const [models, setModels] = useState<any[]>(defaultState.models)
  const [app, setApp] = useState<PIXI.Application>()
  const [configIndex, setConfigIndex] = React.useState<number>(0)

  return (
    <Live2DContext.Provider
      value={{
        background,
        setBackground,
        app,
        setApp,
        models,
        setModels,
        dragable,
        setDragable,
        configIndex,
        setConfigIndex,
      }}
    >
      {children}
    </Live2DContext.Provider>
  )
}
export default Live2DProvider

import { StoryData, StoryMeta } from 'models/story'
import * as PIXI from 'pixi.js'
import React, { createContext, useState } from 'react'
import { parseSce } from 'utils/story'

type ContextType = {
  background: string
  setBackground: (url: string) => void
  app?: PIXI.Application
  setApp: (app: PIXI.Application) => void
  storyData?: StoryData
  storyMeta?: StoryMeta
  loadStoryData: (data: string) => void
}

const defaultState: ContextType = {
  background:
    'https://asset.d4dj.info/adv/ondemand/background/bg_adv_10012.jpg',
  setBackground: () => {},
  setApp: () => {},
  loadStoryData: () => {},
}

export const StoryContext = createContext<ContextType>(defaultState)

function StoryProvider({ children }: { children: React.ReactElement }) {
  const [background, setBackground] = useState<string>(defaultState.background)
  const [app, setApp] = useState<PIXI.Application>()
  const [storyData, setStoryData] = useState<StoryData>()
  const [storyMeta, setStoryMeta] = useState<StoryMeta>()

  const loadStoryData = (data: string) => {
    const parsed = parseSce(data)
    setStoryData(parsed.data)
    setStoryMeta(parsed.meta)
  }

  return (
    <StoryContext.Provider
      value={{
        background,
        setBackground,
        app,
        setApp,
        loadStoryData,
        storyData,
        storyMeta,
      }}
    >
      {children}
    </StoryContext.Provider>
  )
}
export default StoryProvider

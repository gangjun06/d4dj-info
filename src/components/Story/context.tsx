import { Story } from 'models/story'
import * as PIXI from 'pixi.js'
import React, { createContext, useState } from 'react'
import { parseSce } from 'utils/story'

type ContextType = {
  background: string
  setBackground: (url: string) => void
  app?: PIXI.Application
  setApp: (app: PIXI.Application) => void
  storyData?: Story
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
  const [storyData, setStoryData] = useState<Story>()

  const loadStoryData = (data: string) => {
    const parsed = parseSce(data)
  }

  return (
    <StoryContext.Provider
      value={{
        background,
        setBackground,
        app,
        setApp,
        loadStoryData,
      }}
    >
      {children}
    </StoryContext.Provider>
  )
}
export default StoryProvider

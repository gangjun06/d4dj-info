import { SceWords, StoryGroup } from 'models/story'
import * as PIXI from 'pixi.js'
import React, { createContext, useState } from 'react'
import { parseSce } from 'utils/story'

type ContextType = {
  background: string
  setBackground: (url: string) => void
  app?: PIXI.Application
  setApp: (app: PIXI.Application) => void
  storyData?: StoryGroup[]
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
  const [storyData, setStoryData] = useState<StoryGroup[]>()

  const loadStoryData = (data: string) => {
    const parsed = parseSce(data)
    const live2DList = new Map<string, string>()
    for (const item of parsed) {
      item.actions?.forEach((item) => {
        let live2dName = ''
        item.forEach((item) => {
          if (item.name === SceWords.Live2dCharaCreate)
            live2dName = item.value as string
          else if (item.name === SceWords.CharacterName) {
            console.log(item.value)
            live2DList.set(live2dName, item.value as string)
          }
        })
      })
      if (item.plain === '［@End：］') break
    }
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

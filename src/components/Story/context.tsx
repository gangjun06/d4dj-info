import axios from 'axios'
import { StoryData, StoryMeta } from 'models/story'
import * as PIXI from 'pixi.js'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { parseSce } from 'utils/story'

type ContextType = {
  background: string
  setBackground: (url: string) => void
  app?: PIXI.Application
  setApp: (app: PIXI.Application) => void
  storyData?: StoryData
  storyMeta?: StoryMeta
  loadStoryData: (data: string) => void
  backgroundTable: Map<string, string>
  playMusic: (data: string, volume?: number) => void
  stopMusic: () => void
  speaker: string | null
  setSpeaker: (data: string) => void
  text: string | null
  setText: (data: string | null) => void
}

const defaultState: ContextType = {
  background:
    'https://asset.d4dj.info/adv/ondemand/background/bg_adv_10012.jpg',
  setBackground: () => {},
  setApp: () => {},
  loadStoryData: () => {},
  backgroundTable: new Map<string, string>(),
  playMusic: () => {},
  stopMusic: () => {},
  speaker: null,
  setSpeaker: () => {},
  text: null,
  setText: () => {},
}

export const StoryContext = createContext<ContextType>(defaultState)

function StoryProvider({ children }: { children: React.ReactElement }) {
  const [background, setBackgroundState] = useState<string>(
    defaultState.background
  )
  const [app, setApp] = useState<PIXI.Application>()
  const [storyData, setStoryData] = useState<StoryData>()
  const [storyMeta, setStoryMeta] = useState<StoryMeta>()
  const [backgroundTable, setBackgroundTable] = useState<Map<string, string>>(
    defaultState.backgroundTable
  )
  const [speaker, setSpeaker] = useState<string | null>(defaultState.speaker)
  const [text, setText] = useState<string | null>(defaultState.text)

  const musicRef = useRef<HTMLAudioElement>(null)

  const loadStoryData = (data: string) => {
    const parsed = parseSce(data)
    setStoryData(parsed.data)
    setStoryMeta(parsed.meta)
  }

  const playMusic = (data: string, volume?: number) => {
    if (musicRef.current) {
      musicRef.current.src = `https://asset.d4dj.info/plain/adv/ondemand/bgm/${data}.mp3`
      musicRef.current.loop = true
      if (volume) {
        musicRef.current.volume = volume / 100
      }
      musicRef.current.play()
    }
  }
  const stopMusic = () => {
    musicRef?.current?.pause()
  }

  const setBackground = (name: string) => {
    setBackgroundState(
      `https://asset.d4dj.info/adv/ondemand/background/${
        name === 'default' ? 'bg_adv_10012' : backgroundTable.get(name) || ''
      }.jpg`
    )
  }

  useEffect(() => {
    axios
      .get('https://asset.d4dj.info/adv/settings/background_table.txt')
      .then((res) => {
        const map = new Map<string, string>()
        ;(res.data as string).split('\n').forEach((item) => {
          const s = item.split(':')
          map.set(s[0], s[1])
        })
        setBackgroundTable(map)
      })
  }, [])

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
        backgroundTable,
        playMusic,
        stopMusic,
        speaker,
        setSpeaker,
        text,
        setText,
      }}
    >
      <>
        <audio ref={musicRef} />
        {children}
      </>
    </StoryContext.Provider>
  )
}
export default StoryProvider

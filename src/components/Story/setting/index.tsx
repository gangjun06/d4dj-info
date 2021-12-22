import { useWindowWidth } from '@react-hook/window-size'
import {
  defaultTheme,
  Heading,
  Pane,
  Paragraph,
  SideSheet,
  Tab,
  Tablist,
  ThemeProvider,
} from 'evergreen-ui'
import React, { useContext, useEffect, useMemo } from 'react'
import { Live2DContext } from '../context'
import { TabConfig } from './tabConfig'
import { TabModel } from './tabModel'

const theme = {
  ...defaultTheme,
  colors: {
    //@ts-ignore
    ...defaultTheme.colors,
    overlay: 'rgba(0,0,0,0)',
  },
}

type props = {
  isShown: boolean
  onClose: () => void
}

function Content({ selectedIndex }: { selectedIndex: number }) {
  switch (selectedIndex) {
    case 0:
      return <TabConfig />
    default:
      return <TabModel index={selectedIndex - 1} />
  }
}

export function Setting({ isShown, onClose }: props) {
  // const [isShown, setIsShown] = React.useState(false);
  const { dragable, setModels, models, configIndex, setConfigIndex } =
    useContext(Live2DContext)
  const windowWidth = useWindowWidth()
  const sideSheetSize = useMemo(() => {
    if (windowWidth > 800) return undefined
    if (windowWidth > 455) return 400
    return windowWidth - 55
  }, [windowWidth])
  useEffect(() => {
    setModels((item) => {
      item.forEach((model) => {
        model.data.dragable = dragable
      })
      return item
    })
  }, [dragable])
  return (
    <ThemeProvider value={theme}>
      <SideSheet
        isShown={isShown}
        onCloseComplete={onClose}
        width={sideSheetSize}
        containerProps={{
          zIndex: 10,
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16} borderBottom="muted">
            <Heading size={600}>Live2D Config</Heading>
            <Paragraph size={400} color="muted">
              Live2D configuration displayed on screen
            </Paragraph>
          </Pane>
          <Pane display="flex" padding={8}>
            <Tablist>
              {[
                'Config',
                ...(models ? models.map((item) => item.name) : []),
              ].map((tab, index) => (
                <Tab
                  key={tab}
                  isSelected={configIndex === index}
                  onSelect={() => setConfigIndex(index)}
                >
                  {tab}
                </Tab>
              ))}
            </Tablist>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Content selectedIndex={configIndex} />
        </Pane>
      </SideSheet>
    </ThemeProvider>
  )
}

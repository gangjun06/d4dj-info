import { SideOver } from '@/components/Basic'
import React, { useContext, useEffect } from 'react'
import { Live2DContext } from '../context'
import { TabConfig } from './tabConfig'

type props = {
  isShown: boolean
  onClose: () => void
}

export function Setting({ isShown, onClose }: props) {
  // const [isShown, setIsShown] = React.useState(false);
  const { dragable, setModels } = useContext(Live2DContext)

  useEffect(() => {
    setModels((item) => {
      item.forEach((model) => {
        model.data.dragable = dragable
      })
      return item
    })
  }, [dragable])
  return (
    <SideOver open={isShown} onClose={onClose} title="Live2D Config">
      <TabConfig />
    </SideOver>
  )
}

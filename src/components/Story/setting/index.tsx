import { SideOver } from '@/components/Basic'
import React, { useContext } from 'react'
import { StoryContext } from '../context'

type props = {
  isShown: boolean
  onClose: () => void
}

export function Setting({ isShown, onClose }: props) {
  const { loadStoryData } = useContext(StoryContext)

  return (
    <SideOver open={isShown} onClose={onClose} title="Story Viewer">
      <div></div>
    </SideOver>
  )
}

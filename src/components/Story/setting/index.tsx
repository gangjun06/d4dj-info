import { SideOver, SimpleFileUpload } from '@/components/Basic'
import React, { useCallback, useContext } from 'react'
import { StoryContext } from '../context'

type props = {
  isShown: boolean
  onClose: () => void
}

export function Setting({ isShown, onClose }: props) {
  const { storyData, loadStoryData } = useContext(StoryContext)

  const onFileUpload = useCallback(
    async (data: FileList) => {
      const parsed = await data.item(0)?.text()
      parsed && loadStoryData(parsed)
    },
    [loadStoryData]
  )

  return (
    <SideOver open={isShown} onClose={onClose} title="Story Viewer">
      <SimpleFileUpload onFileUpload={onFileUpload} />
      <div>{}</div>
    </SideOver>
  )
}

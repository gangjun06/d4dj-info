import { SideOver, SimpleFileUpload } from '@/components/Basic'
import Link from 'next/link'
import React, { useCallback, useContext } from 'react'
import {
  HiOutlineCollection,
  HiOutlineFastForward,
  HiOutlineRewind,
} from 'react-icons/hi'
import { StoryContext } from '../context'

type props = {
  isShown: boolean
  onClose: () => void
}

export function Setting({ isShown, onClose }: props) {
  const { loadStoryData, next } = useContext(StoryContext)

  const onFileUpload = useCallback(
    async (data: FileList) => {
      const parsed = await data.item(0)?.text()
      parsed && loadStoryData(parsed)
    },
    [loadStoryData]
  )

  return (
    <SideOver
      open={isShown}
      onClose={onClose}
      title="Story Viewer"
      footer={
        next ? (
          <>
            {next.prev ? (
              // <Link passHref href={next.prev}>
              <a href={next.prev} className="btn btn-sm btn-outline">
                <HiOutlineRewind />
              </a>
            ) : (
              // </Link>
              <span />
            )}
            <Link passHref href={next.list}>
              <span className="btn btn-sm btn-outline">
                <HiOutlineCollection />
              </span>
            </Link>
            {next.next ? (
              // <Link passHref href={next.next}>
              <a href={next.next} className="btn btn-sm btn-outline">
                <HiOutlineFastForward />
              </a>
            ) : (
              // </Link>
              <span />
            )}
          </>
        ) : undefined
      }
      footerClassName="flex justify-between"
    >
      {!next && <SimpleFileUpload onFileUpload={onFileUpload} />}
    </SideOver>
  )
}

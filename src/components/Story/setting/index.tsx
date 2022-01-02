import { SideOver, SimpleFileUpload } from '@/components/Basic'
import Link from 'next/link'
import React, { useCallback, useContext, useState } from 'react'
import {
  HiCog,
  HiOutlineCollection,
  HiOutlineFastForward,
  HiOutlineRewind,
} from 'react-icons/hi'
import { StoryContext } from '../context'

export function Setting() {
  const { loadStoryData, next } = useContext(StoryContext)
  const [open, setOpen] = useState<boolean>(false)

  const onFileUpload = useCallback(
    async (data: FileList) => {
      const parsed = await data.item(0)?.text()
      parsed && loadStoryData(parsed)
    },
    [loadStoryData]
  )

  const onClose = useCallback(() => setOpen(false), [])

  return (
    <>
      <SideOver
        open={open}
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
      <div className="absolute right-0 top-0">
        <button className="my-3 mr-4 btn" onClick={() => setOpen(true)}>
          <HiCog size={22} />
          {/*t('common:setting')*/}
        </button>
      </div>
    </>
  )
}

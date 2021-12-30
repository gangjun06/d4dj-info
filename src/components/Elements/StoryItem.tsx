import Image from 'next/image'
import React from 'react'
import { myLoader } from 'utils'

const StoryItem = ({
  title1,
  title2,
  id,
}: {
  title1: string
  title2: string
  id: string | number
}) => (
  <div key={id} className="relative flex shadow-sm cursor-pointer">
    <Image
      loader={myLoader}
      src={`adv/ondemand/preview/preview_10${id}.jpg`}
      width="1024"
      alt={`episode ${id}`}
      height="576"
      className="rounded"
    />
    <div className="story-overlay"></div>
    <div className="z-10 absolute bottom-0 left-0 px-2 py-3 text-white">
      <div>{title1}</div>
      {title2}
    </div>
  </div>
)

export default React.memo(StoryItem)

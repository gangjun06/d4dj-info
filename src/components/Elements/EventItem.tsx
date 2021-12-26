import { Event } from 'models'
import React from 'react'
import { formatTime } from 'utils'
import { EventIcon } from '../Image'

const EventItem = ({ data }: { data: Event }) => (
  <div className="flex-center flex-col">
    <EventIcon id={data.id} />
    <div className="flex flex-row gap-x-2 my-2">
      <div className="badge badge-outline badge-md">{data.type}</div>
    </div>
    {data.name}
    <div className="text-gray-600 mt-0.5">
      {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
    </div>
  </div>
)

export default React.memo(EventItem)

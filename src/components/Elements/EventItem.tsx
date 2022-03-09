import { EventEntity } from '@/generated/graphql'
import React from 'react'
import { formatTime } from 'utils'
import { Card } from '../Basic'
import { EventIcon } from '../Image'

const EventItem = (props: { data: EventEntity }) => {
  const data = props.data!.attributes!
  return (
    <Card link={`/game/event/${props.data.id}`}>
      <EventIcon id={data.masterID!} />
      <div className="flex flex-row gap-x-2 my-2">
        <div className="badge badge-outline badge-md">{data.type}</div>
      </div>
      {data.name}
      <div className="text-gray-600 mt-0.5">
        {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
      </div>
    </Card>
  )
}

export default React.memo(EventItem)

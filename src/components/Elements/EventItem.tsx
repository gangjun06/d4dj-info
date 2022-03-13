import { EventEntity } from '@/generated/graphql'
import React from 'react'
import { formatTime, formatTimeDetail } from 'utils'
import { Card } from '../Basic'
import { EventIcon } from '../Image'

const EventItem = (props: { data: EventEntity }) => {
  const data = props.data!.attributes!
  return (
    <Card link={`/game/event/${props.data.id}`}>
      <EventIcon id={data.masterID!} />
      <div className="flex flex-row gap-x-2 my-2 justify-center">
        <div className="badge">
          <div>{data.type}</div>
        </div>
      </div>
      {data.name}
      <div className="text-gray-600 mt-0.5">
        {`${formatTimeDetail(data.startDate)} ~ ${formatTime(data.endDate)}`}
      </div>
    </Card>
  )
}

export default React.memo(EventItem)

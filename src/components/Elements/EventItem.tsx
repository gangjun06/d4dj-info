import { AllEventsItem } from '@/api/event'
import classNames from 'classnames'
import React from 'react'
import { convertIDNum, formatTime } from 'utils'
import { Card } from '../Basic'
import { EventIcon } from './Image'

const EventItem = ({
  data,
  className,
}: {
  data: AllEventsItem
  className?: string
}) => {
  return (
    <Card
      link={`/game/event/${data.id}`}
      bodyClassName={classNames('flex justify-center items-center flex-col')}
      className={className}
    >
      <EventIcon id={convertIDNum(data.id)} />
      <div className="flex flex-row gap-x-2 my-2 justify-center">
        <div className="badge">
          <div>{data.type}</div>
        </div>
      </div>
      {data.name}
      <div className="text-gray-600 mt-0.5">
        {`${formatTime(data.startDate as unknown as string)} ~ ${formatTime(
          data.endDate as unknown as string
        )}`}
      </div>
    </Card>
  )
}

export default React.memo(EventItem)

import { GachaEntity } from '@/generated/graphql'
import React from 'react'
import { formatTime } from 'utils'
import { Card } from '../Basic'
import { GachaIcon } from '../Image'

const GachaItem = (props: { data: GachaEntity }) => {
  const data = props.data!.attributes!
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/gacha/${props.data.id}`}
    >
      <div className="flex-center flex-col">
        <GachaIcon id={data.masterID!} category={data.category!} />
        <div className="mt-2">{data.name}</div>
        <div className="text-gray-600 mt-0.5">
          {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
        </div>
      </div>
    </Card>
  )
}

export default React.memo(GachaItem)

import { AllGachasItem } from '@/api/gacha'
import React from 'react'
import { convertIDNum, formatTime } from 'utils'
import { Card } from '../Basic'
import { GachaIcon } from '../Image'

const GachaItem = ({ data }: { data: AllGachasItem }) => {
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/gacha/${data.id}`}
    >
      <div className="flex-center flex-col">
        <GachaIcon id={convertIDNum(data.id)} category={data.category} />
        <div className="mt-2">{data.name}</div>
        <div className="text-gray-600 mt-0.5">
          {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
        </div>
      </div>
    </Card>
  )
}

export default React.memo(GachaItem)

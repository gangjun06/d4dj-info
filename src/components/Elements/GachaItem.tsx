import { Gacha, GachaCategory } from 'models'
import React from 'react'
import { formatTime } from 'utils'
import { GachaIcon } from '../Image'

const canUseBanner = (item: Gacha) =>
  item.category !== GachaCategory.Tutorial &&
  item.category !== GachaCategory.Birthday

const GachaItem = ({ data }: { data: Gacha }) => {
  return (
    <div className="flex-center flex-col">
      <GachaIcon id={data.id} category={data.category} />
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600 mt-0.5">
        {`${formatTime(data.startDate)} ~ ${formatTime(data.endDate)}`}
      </div>
    </div>
  )
}

export default React.memo(GachaItem)

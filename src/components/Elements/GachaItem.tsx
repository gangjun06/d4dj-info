import { AllGachasItem } from '@/api/gacha'
import classNames from 'classnames'
import React from 'react'
import { convertIDNum, formatTime } from 'utils'
import { Card } from '../Basic'
import { GachaIcon } from './Image'

const GachaItem = ({
  data,
  noImage = false,
  classNameBody,
  className,
}: {
  classNameBody?: string
  className?: string
  data: AllGachasItem
  noImage?: boolean
}) => {
  return (
    <Card
      bodyClassName={classNames(
        'flex justify-center items-center flex-col',
        classNameBody
      )}
      link={`/game/gacha/${data.id}`}
      className={className}
    >
      {!noImage && (
        <GachaIcon id={convertIDNum(data.id)} category={data.category} />
      )}
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600 mt-0.5">
        {`${formatTime(data.startDate as unknown as string)} ~ ${formatTime(
          data.endDate as unknown as string
        )}`}
      </div>
    </Card>
  )
}

export default React.memo(GachaItem)

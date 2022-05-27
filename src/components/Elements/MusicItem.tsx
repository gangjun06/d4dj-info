import { AllMusicsItem } from '@/api/music'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { convertIDNum } from 'utils'
import { Card } from '../Basic'
import { MusicIcon } from './Image'

const MusicItem = ({ data }: { data: AllMusicsItem }) => {
  const { t } = useTranslation()
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/music/${data.id}`}
    >
      <MusicIcon id={convertIDNum(data.id)} />
      <div className="mt-2 badge">
        {data.charts.map(({ level, id }) => (
          <div className="" key={id}>
            {level}
          </div>
        ))}
      </div>
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600">
        {data.unit.name} - {t(`music:category.${data.category?.toLowerCase()}`)}
      </div>
    </Card>
  )
}

export default React.memo(MusicItem)

import { Music } from 'models'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Card } from '../Basic'
import { MusicIcon } from '../Image'

const MusicItem = ({ data }: { data: Music }) => {
  const { t } = useTranslation()
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/music/${data.id}`}
    >
      <MusicIcon id={data.id} />
      <div className="flex flex-row gap-x-2 mt-2">
        {data.chart?.map((item, index) => (
          <div className="badge badge-outline badge-md" key={index}>
            {item.level}
          </div>
        ))}
      </div>
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600">
        {data.unit?.name} - {t(`music:category.${data.category.toLowerCase()}`)}
      </div>
    </Card>
  )
}

export default React.memo(MusicItem)

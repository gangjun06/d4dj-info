import { MusicEntity } from '@/generated/graphql'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Card } from '../Basic'
import { MusicIcon } from '../Image'

const MusicItem = ({ data: { attributes, id } }: { data: MusicEntity }) => {
  const { t } = useTranslation()
  const data = attributes!
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/music/${id}`}
    >
      <MusicIcon id={data.masterID!} />
      <div className="flex flex-row gap-x-2 mt-2">
        {data.charts?.data?.map(({ attributes, id }, index) => (
          <div className="badge badge-outline badge-md" key={id}>
            {attributes?.level}
          </div>
        ))}
      </div>
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600">
        {data.unit?.data?.attributes?.name} -{' '}
        {t(`music:category.${data.category?.toLowerCase()}`)}
      </div>
    </Card>
  )
}

export default React.memo(MusicItem)

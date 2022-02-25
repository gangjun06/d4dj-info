import { CardEntity } from '@/generated/graphql'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Card } from '../Basic'
import { CardIcon } from '../Image'

const CardItem = ({
  data,
}: {
  data: NonNullable<CardEntity['attributes']>
}) => {
  const { t } = useTranslation()
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/card/${data.masterID}`}
    >
      <CardIcon id={data.masterID!} rarity={data.rarity!} />
      <div className="flex flex-row gap-x-2 my-2">
        <div className="badge badge-outline badge-md">
          {t(`card:rarity.${data.rarity}`)}
        </div>
        <div className="badge badge-outline badge-md">{data.attribute}</div>
      </div>
      {data.cardName}
    </Card>
  )
}

export default React.memo(CardItem)

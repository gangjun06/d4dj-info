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
      <CardIcon
        id={data.masterID!}
        rarity={data.rarity!}
        attribute={data.attribute!}
        unit={
          data.character!.data!.attributes!.unit!.data?.attributes!.masterID ||
          50
        }
      />
      {data.cardName}
    </Card>
  )
}

export default React.memo(CardItem)

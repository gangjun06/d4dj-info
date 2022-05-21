import useTranslation from 'next-translate/useTranslation'
import { AllCardsItem } from 'pages/api/card'
import React from 'react'
import { convertID } from 'utils'
import { Card } from '../Basic'
import { CardIcon } from '../Image'

const CardItem = ({ data }: { data: AllCardsItem }) => {
  const { t } = useTranslation()

  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/card/${data.id}`}
    >
      <CardIcon
        id={data.masterId}
        rarity={parseInt(convertID(data.rarityId))}
        attribute={parseInt(convertID(data.attributeId))}
        unit={parseInt(convertID(data.character.unit.id)) || 50}
      />
      {data.cardName}
    </Card>
  )
}

export default React.memo(CardItem)

import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { convertIDNum } from 'utils'
import { Card } from '../Basic'
import { CardIcon } from './Image'

const CardItem = ({
  data,
  unitId,
  newDesign,
}: {
  data: {
    id: string
    masterId: number
    attribute: number
    cardName: string
    rarity: number
    character?: {
      unit: {
        id: string
        masterId: number
      }
    }
  }
  unitId?: number
  newDesign?: boolean
}) => {
  const { t } = useTranslation()

  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/card/${data.id}`}
      newDesign={newDesign}
    >
      <CardIcon
        id={data.masterId}
        rarity={data.rarity}
        attribute={data.attribute}
        unit={unitId || data.character!.unit.masterId}
      />
      {data.cardName}
    </Card>
  )
}

export default React.memo(CardItem)

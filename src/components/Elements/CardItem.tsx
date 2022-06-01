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
    attributeId: string
    cardName: string
    rarityId: string
    character?: {
      unit: {
        id: string
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
        rarity={convertIDNum(data.rarityId)}
        attribute={convertIDNum(data.attributeId)}
        unit={unitId || convertIDNum(data.character!.unit.id)}
      />
      {data.cardName}
    </Card>
  )
}

export default React.memo(CardItem)

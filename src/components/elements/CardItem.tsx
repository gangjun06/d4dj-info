import { Card as CardModel } from 'models'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import React from 'react'
import { myLoader, pad } from 'utils'
import { Card } from '../Basic'

const CardItem = ({ data }: { data: CardModel }) => {
  const { t } = useTranslation()
  return (
    <Card
      bodyClassName="flex justify-center items-center flex-col"
      link={`/game/card/${data.id}`}
    >
      <Image
        loader={myLoader}
        src={`ondemand/card_icon/card_icon_${pad(data.id, 9)}_${
          data.rarity > 2 ? '1' : '0'
        }.jpg`}
        width="128"
        alt={`card ${data.cardName}`}
        height="128"
      />
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

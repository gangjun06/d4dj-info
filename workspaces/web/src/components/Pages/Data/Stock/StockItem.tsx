import { AllStocksItem } from '@/api/stock'
import { StockIcon } from '@/components/Elements/Image'
import { useRouter } from 'next/router'
import React from 'react'
import { convertIDNum } from 'utils'
import { Card } from '../../../Basic'

const StockItem = ({ data }: { data: AllStocksItem }) => {
  const router = useRouter()

  return (
    <Card
      className="flex justify-center items-center text-center cursor-pointer"
      onClick={() => {
        router.replace(`/game/stock`, `/game/stock/${data.id}`, {
          shallow: true,
        })
      }}
    >
      <StockIcon id={convertIDNum(data.id)} />
      <div>{data.name}</div>
    </Card>
  )
}

export default React.memo(StockItem)

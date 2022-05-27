import { AllStampsItem } from '@/api/stamp'
import { useRouter } from 'next/router'
import React from 'react'
import { convertIDNum } from 'utils'
import { Card } from '../../../Basic'
import { StampIcon } from '../../../Elements/Image'

const StampItem = ({ data }: { data: AllStampsItem }) => {
  const router = useRouter()

  return (
    <Card
      className="flex justify-center items-center text-center cursor-pointer"
      onClick={() => {
        router.replace(`/game/stamp`, `/game/stamp/${data.id}`, {
          shallow: true,
        })
      }}
    >
      <StampIcon id={convertIDNum(data.id)} />
      <div>{data.name}</div>
    </Card>
  )
}

export default React.memo(StampItem)

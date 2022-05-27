import { AllHonorsItem } from '@/api/honor'
import { HonorIcon } from '@/components/Elements'
import { useRouter } from 'next/router'
import React from 'react'
import { convertIDNum } from 'utils'
import { Card } from '../../../Basic'

const HonorItem = ({ data }: { data: AllHonorsItem }) => {
  const router = useRouter()

  return (
    <Card
      className="flex justify-center items-center text-center cursor-pointer"
      onClick={() => {
        router.replace(`/game/honor`, `/game/honor/${data.id}`, {
          shallow: true,
        })
      }}
    >
      <HonorIcon id={convertIDNum(data.id)} />
      <div>{data.name}</div>
    </Card>
  )
}

export default HonorItem

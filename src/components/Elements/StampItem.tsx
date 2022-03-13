import { StampEntity } from '@/generated/graphql'
import { useRouter } from 'next/router'
import React from 'react'
import { Card } from '../Basic'
import { StampIcon } from '../Image'

const StampItem = (props: { data: StampEntity }) => {
  const data = props.data!.attributes!
  const router = useRouter()

  return (
    <Card
      className="flex justify-center items-center text-center"
      onClick={() => {
        router.replace(`/game/stamp`, `/game/stamp/${props.data.id}`, {
          shallow: true,
        })
      }}
    >
      <StampIcon id={data.masterID!} />
      <div>{data.name}</div>
    </Card>
  )
}

export default React.memo(StampItem)

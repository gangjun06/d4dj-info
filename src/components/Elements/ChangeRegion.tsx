import React from 'react'
import { Button } from '../Form'

type props = {
  url: string
  data: { id: string; title: string }[]
}

const ChangeRegion = ({}: props) => {
  return <Button type="Primary"></Button>
}

export default React.memo(ChangeRegion)

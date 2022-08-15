import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { Modal } from '../Basic'
import { Button } from '../Form'

type props = {
  url: string
  data: { id: string; title: string }[]
}

const ChangeRegion = ({ url, data }: props) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <Modal
        title={t('')}
        show={showModal}
        showCloseBtn
        onClose={() => setShowModal(false)}
      >
        {data.map(({ id, title }) => (
          <Link key={id} passHref href={url.replace('{}', id)}>
            <a>{title}</a>
          </Link>
        ))}
      </Modal>
      <Button type="Primary">
        <HiLocationMarker />
      </Button>
    </>
  )
}

export default React.memo(ChangeRegion)

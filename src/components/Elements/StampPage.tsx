import { AllStampsItem, StampOptions } from '@/api/stamp'
import { Modal, Table, TableBody } from '@/components/Basic'
import StampItem from '@/components/Elements/StampItem'
import { DataListLayout } from 'layouts/datalist'
import {
  default as useTransition,
  default as useTranslation,
} from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { convertIDNum, fetcher } from 'utils'
import { StampIcon } from '../Image'

const StampModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { t } = useTranslation()
  const { data, error } = useSWR<{ data: AllStampsItem[] }>(
    `/api/stamp?detail=${id}`,
    fetcher
  )
  if (!data) {
    return <></>
  }
  const stamp = data.data[0]
  return (
    <Modal show={true} showCloseBtn onClose={onClose} center>
      {error ? (
        <div>Error</div>
      ) : (
        <div>
          <StampIcon id={convertIDNum(stamp.id)} />
          <div className="text-md">{stamp.name}</div>
          <div className="text-sm text-gray-500">{stamp.description}</div>
          <Table>
            <TableBody
              data={[
                [t('common:id'), stamp.masterId],
                [t('common:category'), stamp.category],
              ]}
            />
          </Table>
        </div>
      )}
    </Modal>
  )
}

const StampList = () => {
  const { t } = useTransition('')
  const router = useRouter()
  const [modalID, setModalID] = useState<string | null>(null)

  const onCloseModal = useCallback(() => {
    setModalID(null)
    router.replace('/game/stamp', '/game/stamp', { shallow: true })
  }, [router])

  useEffect(() => {
    const find = router.asPath.match(/\d+-\w{2}/)
    if (find && find.length) setModalID(find[0])
  }, [router.asPath])

  return (
    <DataListLayout
      extra={
        <>{modalID && <StampModal id={modalID} onClose={onCloseModal} />}</>
      }
      option={StampOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '' },
      ]}
      title={t('nav:game.card')}
    >
      {({ data }) => <StampItem data={data} key={data.id} />}
    </DataListLayout>
  )
}

export default StampList

import { AllHonorsItem, honorOptions } from '@/api/honor'
import { Modal, Table, TableBody } from '@/components/Basic'
import { HonorIcon, SimpleLoading } from '@/components/Elements'
import { useRouterState } from '@/components/Hooks/useRouterState'
import { DataListLayout } from 'layouts/datalist'
import {
  default as useTransition,
  default as useTranslation,
} from 'next-translate/useTranslation'
import useSWR from 'swr'
import { convertIDNum, fetcher } from 'utils'
import HonorItem from './HonorItem'

const HonorModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { t } = useTranslation()
  const { data, error } = useSWR<{ data: AllHonorsItem[] }>(
    `/api/honor?detail=${id}`,
    fetcher
  )
  if (!data) {
    return <></>
  }
  const honor = data.data[0]
  return (
    <Modal show={true} showCloseBtn onClose={onClose} center>
      {error ? (
        <div>Error</div>
      ) : honor ? (
        <div>
          <div className="flex gap-x-3 justify-center items-center w-full mb-2">
            <HonorIcon id={honor.masterId} />
          </div>
          <div className="text-md">{honor.name}</div>
          <div className="text-sm text-gray-500">{honor.description}</div>
          <Table>
            <TableBody
              data={[
                [t('common:id'), honor.masterId],
                [t('common:type'), honor.type],
                [
                  t('common:effect'),
                  honor.effectType ? t('common:o') : t('common:x'),
                ],
              ]}
            />
          </Table>
        </div>
      ) : (
        <SimpleLoading />
      )}
    </Modal>
  )
}

const HonorPage = () => {
  const { t } = useTransition('')
  const { routerState, resetRouterState } = useRouterState('/game/honor')

  return (
    <DataListLayout
      showExtra={routerState !== null}
      extra={<HonorModal id={routerState!} onClose={resetRouterState} />}
      option={honorOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.honor'), link: '' },
      ]}
      title={t('nav:game.honor')}
    >
      {({ data }) => <HonorItem data={data} key={data.id} />}
    </DataListLayout>
  )
}

export default HonorPage

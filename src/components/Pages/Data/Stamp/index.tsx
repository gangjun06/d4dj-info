import { AllStampsItem, StampOptions } from '@/api/stamp'
import { Modal, Table, TableBody } from '@/components/Basic'
import { SimpleLoading } from '@/components/Elements'
import StampItem from '@/components/Pages/Data/Stamp/StampItem'
import { useRouterState } from '@/hooks/useRouterState'
import { DataListLayout } from 'layouts/datalist'
import useTranslation from 'next-translate/useTranslation'
import { useRef } from 'react'
import useSWR from 'swr'
import { convertIDNum, fetcher } from 'utils'
import { StampIcon } from '../../../Elements/Image'

const StampModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { t } = useTranslation()
  const { data, error } = useSWR<{ data: AllStampsItem[] }>(
    `/api/stamp?detail=${id}`,
    fetcher
  )
  const ref = useRef<HTMLAudioElement>(null)

  const stamp = data ? data.data[0] : null
  return (
    <Modal show={true} showCloseBtn onClose={onClose} center>
      {error && <div>Error</div>}
      {stamp ? (
        <div>
          <StampIcon id={convertIDNum(stamp.id)} />
          <div className="text-md">{stamp.name}</div>
          <div className="text-sm text-gray-500">{stamp.description}</div>
          <button className="text-sm my-1" onClick={() => ref.current?.play()}>
            {t('common:play_audio')}
          </button>
          <audio
            ref={ref}
            src={`https://cdn.d4dj.info/${stamp.id.replace(
              /\w+-/,
              ''
            )}/plain/voice/stamp/stamp_${stamp.masterId}.mp3`}
          />
          <Table>
            <TableBody
              data={[
                [t('common:id'), stamp.masterId],
                [
                  t('common:category'),
                  t(`common:${stamp.category.toLowerCase()}`),
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

const StampPage = () => {
  const { t } = useTranslation()
  const { routerState, resetRouterState } = useRouterState('/game/stamp')

  return (
    <DataListLayout
      showExtra={routerState !== null}
      extra={<StampModal id={routerState!} onClose={resetRouterState} />}
      option={StampOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.stamp'), link: '' },
      ]}
      title={t('nav:game.stamp')}
    >
      {({ data }) => <StampItem data={data} key={data.id} />}
    </DataListLayout>
  )
}

export default StampPage

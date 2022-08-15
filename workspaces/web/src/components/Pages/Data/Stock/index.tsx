import { AllStocksItem, StockOptions } from '@/api/stock'
import { Modal, Table, TableBody } from '@/components/Basic'
import { SimpleLoading } from '@/components/Elements'
import { useRouterState } from '@/components/Hooks/useRouterState'
import { DataListLayout } from 'layouts/datalist'
import {
  default as useTransition,
  default as useTranslation,
} from 'next-translate/useTranslation'
import useSWR from 'swr'
import { convertIDNum, fetcher, formatTime } from 'utils'
import { StockIcon } from '../../../Elements/Image'
import StockItem from './StockItem'

const StockModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { t } = useTranslation()
  const { data, error } = useSWR<{ data: AllStocksItem[] }>(
    `/api/stock?detail=${id}`,
    fetcher
  )
  if (!data) {
    return <></>
  }
  const stock = data.data[0]
  return (
    <Modal show={true} showCloseBtn onClose={onClose} center>
      {error ? (
        <div>Error</div>
      ) : stock ? (
        <div>
          <div className="flex gap-x-3 justify-center items-center w-full mb-2">
            <StockIcon id={convertIDNum(stock.id)} />
            <StockIcon id={convertIDNum(stock.id)} frameless />
          </div>
          <div className="text-md">{stock.name}</div>
          <div className="text-sm text-gray-500">{stock.summary}</div>
          <Table>
            <TableBody
              data={[
                [t('common:id'), stock.masterId],
                [t('common:category'), stock.category],
                [t('common:start_date'), formatTime(stock.startDate)],
                [t('common:end_date'), formatTime(stock.endDate)],
                [t('common:max_amount'), stock.maxAmount],
                [t('common:view_category'), stock.viewCategory?.name],
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

const StockPage = () => {
  const { t } = useTransition('')
  const { routerState, resetRouterState } = useRouterState('/game/stock')

  return (
    <DataListLayout
      showExtra={routerState !== null}
      extra={<StockModal id={routerState!} onClose={resetRouterState} />}
      option={StockOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.stock'), link: '' },
      ]}
      title={t('nav:game.stock')}
    >
      {({ data }) => <StockItem data={data} key={data.id} />}
    </DataListLayout>
  )
}

export default StockPage

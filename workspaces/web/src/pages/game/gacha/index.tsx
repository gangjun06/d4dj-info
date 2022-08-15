import { GachaOptions } from '@/api/gacha'
import { GachaItem } from '@/components/Elements'
import { DataListLayout } from 'layouts/datalist'
import useTransition from 'next-translate/useTranslation'

const EventList = () => {
  const { t } = useTransition('')
  return (
    <DataListLayout
      option={GachaOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.gacha'), link: '' },
      ]}
      title={t('nav:game.gacha')}
    >
      {({ data }) => <GachaItem data={data} key={data.id} />}
    </DataListLayout>
  )
}
export default EventList

import { EventOptions } from '@/api/event'
import { EventItem } from '@/components/Elements'
import { DataListLayout } from 'layouts/datalist'
import useTransition from 'next-translate/useTranslation'

const EventList = () => {
  const { t } = useTransition('')
  return (
    <DataListLayout
      option={EventOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.event.name'), link: '' },
      ]}
      title={t('nav:game.event.name')}
    >
      {({ data }) => <EventItem data={data} key={data.id} />}
    </DataListLayout>
  )
}
export default EventList

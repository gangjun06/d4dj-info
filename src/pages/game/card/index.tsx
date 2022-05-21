import { CardOptions } from '@/api/card'
import { CardItem } from '@/components/Elements'
import { DataListLayout } from 'layouts/datalist'
import useTransition from 'next-translate/useTranslation'

const CardList = () => {
  const { t } = useTransition('')
  return (
    <DataListLayout
      option={CardOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '/game/card' },
      ]}
      title={t('nav:game.card')}
    >
      {({ data }) => <CardItem data={data} key={data.id} />}
    </DataListLayout>
  )
}
export default CardList

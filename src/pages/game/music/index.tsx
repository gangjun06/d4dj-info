import { musicOptions } from '@/api/music'
import { MusicItem } from '@/components/Elements'
import { DataListLayout } from 'layouts/datalist'
import useTransition from 'next-translate/useTranslation'

const MusicList = () => {
  const { t } = useTransition('')
  return (
    <DataListLayout
      option={musicOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.music'), link: '' },
      ]}
      title={t('nav:game.music')}
    >
      {({ data }) => <MusicItem data={data} key={data.id} />}
    </DataListLayout>
  )
}
export default MusicList

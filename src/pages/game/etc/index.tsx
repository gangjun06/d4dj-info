import { Card } from '@/components/Basic'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { HiChevronRight } from 'react-icons/hi'

export default function Etc() {
  const { t } = useTransition('')
  return (
    <MainLayout
      title={t('nav:game.etc.name')}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.etc.name'), link: '/game/etc' },
      ]}
    >
      <div className="grid-2">
        <Card link="/game/etc/exp">
          <div className="flex justify-between items-center">
            <div>{t('nav:game.etc.exp')}</div>
            <HiChevronRight size={22} />
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}

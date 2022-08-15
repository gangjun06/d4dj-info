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
        <Card link="/live2d">
          <div className="flex justify-between items-center">
            <div>{t('nav:live2d_viewer')}</div>
            <HiChevronRight size={22} />
          </div>
        </Card>
        <Card link="/story">
          <div className="flex justify-between items-center">
            <div>{t('nav:story_viewer')}</div>
            <HiChevronRight size={22} />
          </div>
        </Card>
        <Card link="/game/stamp">
          <div className="flex justify-between items-center">
            <div>{t('nav:game.stamp')}</div>
            <HiChevronRight size={22} />
          </div>
        </Card>
        <Card link="/game/stock">
          <div className="flex justify-between items-center">
            <div>{t('nav:game.stock')}</div>
            <HiChevronRight size={22} />
          </div>
        </Card>
        <Card link="/game/honor">
          <div className="flex justify-between items-center">
            <div>{t('nav:game.honor')}</div>
            <HiChevronRight size={22} />
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}

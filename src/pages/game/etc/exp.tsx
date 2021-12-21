import { Exp } from '@/components/elements'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'

export default function Etc() {
  const { t } = useTransition('')
  return (
    <MainLayout
      title={t('nav:game.etc.exp')}
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.etc.name'), link: '/game/etc' },
        { name: t('nav:game.etc.exp'), link: '/game/etc/exp' },
      ]}
    >
      <div className="grid-3">
        <Exp.UserExpCard />
        <Exp.UnitExpCard />
        <Exp.CardExpCard />
        <Exp.SkillExpCard />
      </div>
    </MainLayout>
  )
}
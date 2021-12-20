import { GetUnitRes, GET_UNIT } from '@/apollo/gql'
import { Card } from '@/components/Basic'
import { CharacterIcon } from '@/components/Image'
import { WaitQuery } from '@/components/Util'
import { useQuery } from '@apollo/client'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import Link from 'next/link'

export default function Character() {
  const { t } = useTransition('')
  const { loading, error, data } = useQuery<GetUnitRes>(GET_UNIT)
  return (
    <MainLayout
      title={t('nav:game.character')}
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character'), link: '/game/character' },
      ]}
    >
      <WaitQuery loading={loading} error={error}>
        <div>
          {data?.unit.map((item) => {
            if (!item.characters.length) return <></>
            return (
              <Card className="mb-3" title={item.name} key={item.id}>
                <div className="flex justify-around flex-wrap">
                  {item.characters.map((item) => (
                    <Link
                      href={`/game/character/${item.id}`}
                      passHref
                      key={item.id}
                    >
                      <a className="flex flex-col justify-center items-center">
                        <CharacterIcon
                          id={item.id}
                          alt={item.fullNameEnglish}
                        />
                        {item.fullNameEnglish || item.firstNameEnglish}
                      </a>
                    </Link>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </WaitQuery>
    </MainLayout>
  )
}

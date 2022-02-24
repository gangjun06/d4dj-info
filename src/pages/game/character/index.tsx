import { Card } from '@/components/Basic'
import { CharacterIcon } from '@/components/Image'
import { WaitQuery } from '@/components/Util'
import { useUnitsQuery } from '@/generated/graphql'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import Link from 'next/link'
import { HiOutlineBookOpen } from 'react-icons/hi'

export default function Character() {
  const { t } = useTransition('')
  // const { loading, error, data } = useQuery<GetUnitRes>(GET_UNIT)
  const { loading, data, error } = useUnitsQuery({
    variables: { locale: 'ja-JP' },
  })
  return (
    <MainLayout
      title={t('nav:game.character.name')}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character.name'), link: '/game/character' },
      ]}
    >
      <WaitQuery loading={loading} error={error}>
        <div>
          {data?.units?.data.map(({ attributes }) => {
            if (!attributes?.characters?.data.length) return <></>
            return (
              <Card
                className="mb-3"
                title={attributes.name || ''}
                key={attributes.masterID}
                right={
                  <Link
                    href={`/game/unit/${attributes.masterID}/story`}
                    passHref
                  >
                    <HiOutlineBookOpen
                      size={22}
                      className="cursor-pointer text-gray-600"
                    />
                  </Link>
                }
              >
                <div className="flex justify-around flex-wrap">
                  {attributes.characters?.data.map(({ attributes }) => (
                    <Link
                      href={`/game/character/${attributes!.masterID}`}
                      passHref
                      key={attributes!.masterID}
                    >
                      <a className="flex flex-col justify-center items-center">
                        <CharacterIcon
                          id={attributes!.masterID!}
                          alt={attributes?.fullNameEnglish || ''}
                        />
                        {attributes?.fullNameEnglish ||
                          attributes?.firstNameEnglish}
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

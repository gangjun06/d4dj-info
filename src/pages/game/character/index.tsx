import { Card } from '@/components/Basic'
import { CharacterIcon } from '@/components/Image'
import { useSetting } from '@/components/Setting'
import { WaitQuery } from '@/components/Util'
import { useUnitsQuery } from '@/generated/graphql'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import Link from 'next/link'
import { Fragment } from 'react'
import { HiOutlineBookOpen } from 'react-icons/hi'

export default function Character() {
  const { t } = useTransition('')
  // const { loading, error, data } = useQuery<GetUnitRes>(GET_UNIT)
  const { region } = useSetting()

  const { loading, data, error } = useUnitsQuery({
    variables: { locale: region },
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
            if (!attributes?.characters?.data.length)
              return <Fragment key={attributes?.masterID}></Fragment>
            return (
              <Card
                className="mb-3"
                title={attributes.name || ''}
                key={attributes.masterID!}
                right={
                  <Link
                    href={`/game/unit/${attributes.masterID}/story`}
                    passHref
                  >
                    <a>
                      <HiOutlineBookOpen size={22} className="text-gray-600" />
                    </a>
                  </Link>
                }
              >
                <div className="flex justify-around flex-wrap">
                  {attributes.characters?.data.map(({ attributes }) => (
                    <Link
                      href={`/game/character/${attributes!.masterID}`}
                      passHref
                      key={attributes!.masterID!}
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

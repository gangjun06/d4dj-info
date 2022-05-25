import { Card } from '@/components/Basic'
import { CharacterIcon } from '@/components/Elements/Image'
import prisma from '@/lib/prisma'
import { CharacterMaster, UnitMaster } from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import Link from 'next/link'
import { Fragment } from 'react'

export const Character = ({
  units,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTransition('')

  return (
    <MainLayout
      title={t('nav:game.character.name')}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character.name'), link: '/game/character' },
      ]}
    >
      {units.map(({ id, characters, name }) => {
        if (!characters.length) return <Fragment key={id}></Fragment>
        return (
          <Card
            className="mb-3"
            title={name}
            key={id}
            // right={
            //   <Link href={`/game/unit/${id}/story`} passHref>
            //     <a>
            //       <HiOutlineBookOpen size={22} className="text-gray-600" />
            //     </a>
            //   </Link>
            // }
          >
            <div className="flex justify-around flex-wrap">
              {characters.map(
                ({ id, masterId, fullNameEnglish, firstNameEnglish }) => (
                  <Link href={`/game/character/${id}`} passHref key={id}>
                    <a className="flex flex-col justify-center items-center">
                      <CharacterIcon id={masterId} alt={fullNameEnglish} />
                      {fullNameEnglish || firstNameEnglish}
                    </a>
                  </Link>
                )
              )}
            </div>
          </Card>
        )
      })}
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<{
  units: (UnitMaster & {
    characters: CharacterMaster[]
  })[]
}> = async () => {
  const data = await prisma.unitMaster.findMany({
    include: {
      characters: true,
    },
  })

  return {
    props: {
      units: data,
    },
    revalidate: 3600,
  }
}

export default Character

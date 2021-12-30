import {
  GetUnitEpisodeReq,
  GetUnitEpisodeRes,
  GET_UNIT_EPISODE,
} from '@/apollo/gql'
import { StoryItem } from '@/components/Elements'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { Unit } from 'models'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React, { useState } from 'react'

export default function UnitEpisode({
  unit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const [tab, setTab] = useState<number>(0)

  return (
    <MainLayout
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character'), link: '/game/character' },
        {
          name: t('nav:game.unit.story'),
          link: `/game/unit/${unit.id}/story`,
        },
      ]}
      title={`${unit.name}`}
    >
      <div className="grid-1">
        {unit.unitEpisode.map((data) => (
          <StoryItem
            key={data.episode.id}
            id={data.episode.id}
            title1={`${data.season} - ${data.chapterNumber}`}
            title2={data.episode.title}
            to={`/game/unit/${unit.id}/story/${data.season}-${data.chapterNumber}`}
          />
        ))}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{ unit: Unit }> = async (
  context
) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query<GetUnitEpisodeRes, GetUnitEpisodeReq>({
    query: GET_UNIT_EPISODE,
    variables: {
      filter: {
        id: parseInt(id as string),
      },
    },
    fetchPolicy: 'no-cache',
  })

  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      unit: data.unit[0],
    },
  }
}

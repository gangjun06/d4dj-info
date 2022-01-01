import {
  GetUnitEpisodeReq,
  GetUnitEpisodeRes,
  GET_UNIT_EPISODE,
} from '@/apollo/gql'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { Unit } from 'models'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'

export default function UnitEpisode({
  unit,
  index,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character'), link: '/game/character' },
        { name: unit.name, link: '' },
        {
          name: `${t('nav:game.unit.story')}`,
          link: `/game/unit/${unit.id}/story`,
        },
        {
          name: `${t('nav:game.unit.story')}`,
          link: `/game/unit/${unit.id}/story`,
        },
      ]}
      title={`${unit.unitEpisode[index].episode.title} [${unit.name}]`}
    >
      <div className="grid-1">
        {/* <StoryItem
            key={unit.episode.id}
            id={data.episode.id}
            title1={`${data.season} - ${data.chapterNumber}`}
            title2={data.episode.title}
            to={`/game/unit/${unit.id}/story/${data.season}-${data.chapterNumber}`}
          /> */}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  unit: Unit
  index: number
}> = async (context) => {
  const id = context.query.id
  const storyID = context.query.storyID
  if (typeof id !== 'string' || typeof storyID !== 'string')
    return {
      notFound: true,
    }

  const splitedStoryID = storyID.split('-')
  if (
    splitedStoryID.length !== 2 ||
    isNaN(splitedStoryID[0] as any) ||
    isNaN(splitedStoryID[1] as any)
  )
    return {
      notFound: true,
    }

  const [chapterNumber, season] = [
    parseInt(splitedStoryID[0]),
    parseInt(splitedStoryID[1]),
  ]
  if (chapterNumber > 20 || season > 2)
    return {
      notFound: true,
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
  const index = data.unit[0].unitEpisode.findIndex(
    (d) => d.chapterNumber === chapterNumber && d.season === season
  )

  return {
    props: {
      unit: data.unit[0],
      index,
    },
  }
}

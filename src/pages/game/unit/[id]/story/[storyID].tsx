import {
  GetUnitEpisodeReq,
  GetUnitEpisodeRes,
  GET_UNIT_EPISODE,
} from '@/apollo/gql'
import CommonStoryPage from '@/components/Story/CommonStoryPage'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

export default function UnitEpisode({
  title,
  unitName,
  episodeID,
  unitID,
  prevUrl,
  nextUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout disableLayout title={`${title} [${unitName}]`}>
      <CommonStoryPage
        name={`10${episodeID}`}
        next={{
          prev: prevUrl && `/game/unit/${unitID}/story/${prevUrl}`,
          list: `/game/unit/${unitID}/story/`,
          next: nextUrl && `/game/unit/${unitID}/story/${nextUrl}`,
        }}
      />
      {/* </div> */}
    </MainLayout>
  )
}

type props = {
  title: string
  unitName: string
  unitID: number
  episodeID: number
  prevUrl?: string
  nextUrl?: string
}

export const getServerSideProps: GetServerSideProps<props> = async (
  context
) => {
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

  const [season, chapterNumber] = [
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
  const unit = data.unit[0]
  const index = unit.unitEpisode.findIndex(
    (d) => d.chapterNumber === chapterNumber && d.season === season
  )
  const targetEpisode = unit.unitEpisode[index].episode
  const prevEpisode = unit.unitEpisode[index - 1]
  const nextEpisode = unit.unitEpisode[index + 1]

  const returnData: props = {
    unitID: unit.id,
    unitName: unit.name,
    title: targetEpisode.title,
    episodeID: targetEpisode.id,
  }

  if (prevEpisode)
    returnData.prevUrl = `${prevEpisode.season}-${prevEpisode.chapterNumber}`
  if (nextEpisode)
    returnData.nextUrl = `${nextEpisode.season}-${nextEpisode.chapterNumber}`

  return {
    props: {
      ...returnData,
    },
  }
}

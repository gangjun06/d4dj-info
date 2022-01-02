import { GetEventReq, GetEventRes, GET_EVENT_DETAIL } from '@/apollo/gql'
import CommonStoryPage from '@/components/Story/CommonStoryPage'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

export default function EventEpisode({
  title,
  eventName,
  episodeID,
  eventID,
  prevUrl,
  nextUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout disableLayout title={`${title} [${eventName}]`}>
      <CommonStoryPage
        name={`2000${episodeID}`}
        next={{
          prev: prevUrl && `/game/event/${eventID}/story/${prevUrl}`,
          list: `/game/event/${eventID}`,
          next: nextUrl && `/game/event/${eventID}/story/${nextUrl}`,
        }}
      />
      {/* </div> */}
    </MainLayout>
  )
}

type props = {
  title: string
  eventName: string
  eventID: number
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

  if (isNaN(storyID as any))
    return {
      notFound: true,
    }

  const chapterNumber = parseInt(storyID)

  if (chapterNumber > 10)
    return {
      notFound: true,
    }

  const { data } = await client.query<GetEventRes, GetEventReq>({
    query: GET_EVENT_DETAIL,
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
  const event = data.event[0]
  const index = event.eventEpisode.findIndex(
    (d) => d.chapterNumber === chapterNumber
  )

  if (index < 0) return { notFound: true }

  const targetEpisode = event.eventEpisode[index]
  const prevEpisode = event.eventEpisode[index - 1]
  const nextEpisode = event.eventEpisode[index + 1]

  const returnData: props = {
    eventID: event.id,
    eventName: event.name,
    title: targetEpisode.episode.title,
    episodeID: targetEpisode.id,
  }

  if (prevEpisode) returnData.prevUrl = `${prevEpisode.chapterNumber}`
  if (nextEpisode) returnData.nextUrl = `${nextEpisode.chapterNumber}`

  return {
    props: {
      ...returnData,
    },
  }
}

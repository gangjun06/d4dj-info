import {
  GetCharacterReq,
  GetCharacterRes,
  GET_CHARACTER_DETAIL,
} from '@/apollo/gql'
import CommonStoryPage from '@/components/Story/CommonStoryPage'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

export default function CharacterEpisode({
  title,
  characterName,
  episodeID,
  characterID,
  prevUrl,
  nextUrl,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout disableLayout title={`${title} [${characterName}]`}>
      <CommonStoryPage
        name={`60${episodeID}`}
        next={{
          prev: prevUrl && `/game/event/${characterID}/story/${prevUrl}`,
          list: `/game/event/${characterID}`,
          next: nextUrl && `/game/event/${characterID}/story/${nextUrl}`,
        }}
      />
      {/* </div> */}
    </MainLayout>
  )
}

type props = {
  title: string
  characterName: string
  characterID: number
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

  const chapterNumber = parseInt(storyID) - 1

  if (chapterNumber > 10)
    return {
      notFound: true,
    }

  const { data } = await client.query<GetCharacterRes, GetCharacterReq>({
    query: GET_CHARACTER_DETAIL,
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
  const character = data.character[0]
  const index = character.characterEpisode.findIndex(
    (d) => d.chapterNumber === chapterNumber
  )

  if (index < 0) return { notFound: true }

  const targetEpisode = character.characterEpisode[index]
  const prevEpisode = character.characterEpisode[index - 1]
  const nextEpisode = character.characterEpisode[index + 1]

  const returnData: props = {
    characterID: character.id,
    characterName: character.firstNameEnglish,
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

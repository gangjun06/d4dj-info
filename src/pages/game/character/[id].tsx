import { Card, Disclosure, Table, TableBody } from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { CharacterIcon } from '@/components/Image'
import {
  CharacterDocument,
  CharacterQuery,
  CharacterQueryVariables,
} from '@/generated/graphql'
import { client } from '@/lib/apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import Image from 'next/image'
import React from 'react'
import { ValuesType } from 'utility-types'
import { loadRegion, myLoader, pad } from 'utils'
import { createLive2DShare } from 'utils/live2d'

export default function CardDetail({
  character,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character.name'), link: '/game/character' },
        {
          name: t('nav:game.character_detail'),
          link: `/game/character/${character.masterID}`,
        },
      ]}
      title={`${character.fullNameEnglish || character?.firstNameEnglish}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('character:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <CharacterIcon
              id={character.masterID!}
              alt={character.fullNameEnglish!}
            />

            <div className="mt-2">
              {character.fullNameEnglish || character.firstNameEnglish}
            </div>

            <div className="text-gray-600">
              {character.unit?.data?.attributes?.name}
            </div>
            <Table>
              <TableBody
                data={[
                  [t('character:id'), character.masterID!],
                  [t('character:color_code'), character.colorCode!],
                  [t('character:firstname'), character.firstName!],
                  [t('character:firstname_eng'), character.firstNameEnglish!],
                  [t('character:fullname'), character.fullName!],
                  [t('character:fullname_eng'), character.fullNameEnglish!],
                  [
                    t('nav:live2d'),
                    {
                      link: createLive2DShare([
                        {
                          name:
                            character.fullNameEnglish ||
                            character.firstNameEnglish ||
                            '',
                          model: `live2d_chara_${pad(
                            character.masterID!,
                            3
                          )}0001`,
                        },
                      ]),
                      name: t('nav:live2d'),
                    },
                  ],
                ]}
              />
            </Table>
          </Card>
        </div>
        {character.masterID! < 700 && (
          <div className="col-span-1 md:col-span-2">
            <Card title={t('character:illustrations.name')}>
              <Disclosure title={t('character:illustrations.livestart')}>
                <div className="flex-center">
                  <Image
                    loader={myLoader}
                    src={`LiveStartCutin/${pad(
                      character.unit!.data?.attributes?.masterID || 0,
                      2
                    )}/LiveStartChara${pad(character.masterID!, 3)}.png`}
                    width={3200}
                    height={270}
                    alt={`live start cutin image`}
                  />
                </div>
              </Disclosure>
              <Disclosure title={t('character:illustrations.rankheader')}>
                <div className="flex-center">
                  <Image
                    loader={myLoader}
                    src={`ondemand/character/character_rank_header_${pad(
                      character.masterID!,
                      3
                    )}.png`}
                    width={429}
                    height={154}
                    alt={`rank header`}
                  />
                </div>
              </Disclosure>
              <Disclosure title={t('character:illustrations.gacha_silhouette')}>
                <div className="flex-center bg-gray-500 relative h-48">
                  <Image
                    loader={myLoader}
                    src={`ondemand/character/gacha_silhouette_${pad(
                      character.masterID!,
                      3
                    )}.png`}
                    layout="fill"
                    objectFit="contain"
                    alt={`gacha silhouette image`}
                  />
                </div>
              </Disclosure>
              <Disclosure title={t('character:illustrations.profile')}>
                <div className="flex-center">
                  <Image
                    loader={myLoader}
                    src={`ondemand/character_profile/character_profile_${pad(
                      character.masterID!,
                      3
                    )}.jpg`}
                    width={2478}
                    height={1440}
                    alt={`transparent image`}
                  />
                </div>
              </Disclosure>
              <Disclosure title={t('character:illustrations.standup')}>
                <div className="flex-center relative h-96">
                  <Image
                    loader={myLoader}
                    src={`ondemand/character/character_stand_up_${pad(
                      character.masterID!,
                      3
                    )}.png`}
                    layout="fill"
                    objectFit="contain"
                    alt={`stand up image`}
                  />
                </div>
              </Disclosure>
            </Card>
            {/* {character.characterEpisode!.length !== 0 && (
              <Card className="mt-4" title={t('nav:game.character.story')}>
                <div className="grid-2">
                  {character.characterEpisode!.map((data) => (
                    <StoryItem
                      key={data.episode.id}
                      id={data.episode.id}
                      title1={`${data.chapterNumber + 1}`}
                      title2={data.episode.title}
                      imgPrefix="60"
                      to={`/game/character/${character.id}/story/${
                        data.chapterNumber + 1
                      }`}
                    />
                  ))}
                </div>
              </Card>
            )} */}
          </div>
        )}

        {character.cards?.data?.length !== 0 && (
          <>
            <div className="subtitle">{t('character:card_list')}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {character.cards!.data!.map((item, index) => (
                  <CardItem key={index} data={item.attributes!} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  character: NonNullable<
    ValuesType<NonNullable<CharacterQuery['characters']>['data']>['attributes']
  >
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const region = loadRegion()

  const { data } = await client.query<CharacterQuery, CharacterQueryVariables>({
    query: CharacterDocument,
    variables: {
      locale: region,
      pagination: {
        limit: 1,
      },
      filters: {
        masterID: {
          eq: parseInt(id as string),
        },
      },
    },
    fetchPolicy: 'no-cache',
  })

  if (!data?.characters?.data.length) {
    return { notFound: true }
  }

  return {
    props: {
      character: data.characters!.data[0].attributes!,
    },
  }
}

import { AllCardsItem } from '@/api/card'
import { Card, Disclosure, Table, TableBody } from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { CharacterIcon, Image } from '@/components/Image'
import prisma from '@/lib/prisma'
import { CharacterMaster, UnitMaster } from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { GetURLType, pad } from 'utils'
import { createLive2DShare } from 'utils/live2d'

export default function CardDetail({
  character,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTransition('')

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.character.name'), link: '/game/character' },
        {
          name: t('nav:game.character_detail'),
          link: ``,
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
              id={character.masterId}
              alt={character.fullNameEnglish!}
            />

            <div className="mt-2">
              {character.fullNameEnglish || character.firstNameEnglish}
            </div>

            <div className="text-gray-600">{character.unit.name}</div>
            <Table>
              <TableBody
                data={[
                  [t('common:id'), character.masterId],
                  [t('character:color_code'), character.colorCode],
                  [t('character:firstname'), character.firstName],
                  [t('character:firstname_eng'), character.firstNameEnglish],
                  [t('character:fullname'), character.fullName],
                  [t('character:fullname_eng'), character.fullNameEnglish],
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
                            character.masterId,
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
        {character.masterId! < 700 && (
          <div className="col-span-1 md:col-span-2">
            <Card title={t('character:illustrations.name')}>
              <Disclosure
                title={t('character:illustrations.livestart')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CharaLiveStart}
                  parameter={[character.unit.masterId, character.masterId]}
                  width={3200}
                  height={270}
                />
              </Disclosure>
              <Disclosure
                title={t('character:illustrations.rankheader')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CharaRankHeader}
                  parameter={[character.masterId]}
                  width={429}
                  height={154}
                />
              </Disclosure>
              <Disclosure
                title={t('character:illustrations.profile')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CharaProfile}
                  parameter={[character.masterId]}
                  width={2478}
                  height={1440}
                />
              </Disclosure>
              <Disclosure
                title={t('character:illustrations.gacha_silhouette')}
                className="bg-gray-500 h-48"
              >
                <Image
                  auto
                  urlType={GetURLType.CharaSilhouette}
                  parameter={[character.masterId]}
                />
              </Disclosure>
              <Disclosure
                title={t('character:illustrations.standup')}
                className="h-72"
              >
                <Image
                  urlType={GetURLType.CardStandUp}
                  parameter={[character.masterId]}
                  auto
                />
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

        {character.cards.length !== 0 && (
          <>
            <div className="subtitle">{t('character:card_list')}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {character.cards.map((item) => (
                  <CardItem
                    key={item.id}
                    data={item as AllCardsItem}
                    unitId={character.unit.masterId}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await prisma.characterMaster.findMany({
    select: {
      id: true,
    },
  })
  return {
    paths: data.map(({ id }) => ({ params: { id } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  {
    character: CharacterMaster & {
      unit: UnitMaster
      cards: {
        id: string
        attributeId: string
        rarityId: string
      }[]
    }
  },
  { id: string }
> = async ({ params }) => {
  if (!params) throw new Error('No path parameters found')

  const { id } = params

  const data = await prisma.characterMaster.findUnique({
    where: {
      id,
    },
    include: {
      unit: true,
      cards: {
        select: {
          id: true,
          masterId: true,
          attributeId: true,
          rarityId: true,
          cardName: true,
        },
      },
    },
  })

  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      character: data,
    },
    revalidate: 1800,
  }
}

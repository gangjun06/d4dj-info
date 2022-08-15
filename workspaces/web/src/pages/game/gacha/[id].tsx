import {
  Card,
  Disclosure,
  Table,
  TableBody,
  TextFormat,
} from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { GachaIcon, Image } from '@/components/Elements/Image'
import prisma from '@/lib/prisma'
import {
  GachaExplanationWordMaster,
  GachaMaster,
  GachaNotesWordMaster,
  GachaSummaryWordMaster,
} from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { formatTimeDetail, GetURLType, pad } from 'utils'

export default function CardDetail({
  gacha,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.gacha'), link: '/game/gacha' },
        {
          name: t('nav:game.gacha_detail'),
          link: ``,
        },
      ]}
      title={`${gacha.name}`}
      rootExtra={
        <div className="absolute w-screen h-screen -z-10">
          <Image
            urlType={GetURLType.GachaLive2DBG}
            parameter={[pad(gacha.pickUpCards[0].masterId, 9)]}
            region={gacha.region}
            layout="fill"
          />
        </div>
      }
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('gacha:info')}
            bodyClassName="flex justify-center flex-col items-center"
            newDesign
          >
            <GachaIcon
              id={gacha.masterId}
              category={gacha.category}
              region={gacha.region}
            />

            <div className="m-2">{gacha.name}</div>

            <Table>
              <TableBody
                data={[
                  [t('common:id'), gacha.masterId],
                  [t('common:start_date'), formatTimeDetail(gacha.startDate)],
                  [t('common:end_date'), formatTimeDetail(gacha.endDate)],
                  [t('common:type'), gacha.type],
                  [t('common:category'), gacha.category],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t('gacha:descriptions')} newDesign>
            <Disclosure title={t('gacha:summary')} newDesign>
              <TextFormat>{gacha.summary.text}</TextFormat>
            </Disclosure>
            <Disclosure title={t('gacha:note')} newDesign>
              <TextFormat>{gacha.note.text}</TextFormat>
            </Disclosure>
            <Disclosure title={t('gacha:detail')} newDesign>
              <TextFormat>{gacha.detail.text}</TextFormat>
            </Disclosure>
          </Card>
        </div>

        {gacha.pickUpCards.length !== 0 && (
          <>
            <div className="subtitle">{t('gacha:pickup_cards')}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {gacha.pickUpCards.map((item, index) => (
                  <CardItem newDesign key={item.id} data={item} />
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
  gacha: GachaMaster & {
    summary: GachaSummaryWordMaster
    note: GachaNotesWordMaster
    pickUpCards: {
      id: string
      masterId: number
      attributeId: string
      cardName: string
      rarityId: string
    }[]
    detail: GachaExplanationWordMaster
  }
}> = async ({ query, res }) => {
  const { id } = query
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const data = await prisma.gachaMaster.findUnique({
    where: {
      id,
    },
    // select: {},
    include: {
      summary: true,
      detail: true,
      note: true,
      pickUpCards: {
        select: {
          id: true,
          masterId: true,
          attributeId: true,
          cardName: true,
          rarityId: true,
          character: {
            include: {
              unit: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!data) {
    return { notFound: true }
  }

  data.summary.text = data.summary.text
    .replaceAll('{GachaName}', data.name)
    .replaceAll('{GachaType}', data.type)
  data.note.text = data.note.text
    .replaceAll('{GachaName}', data.name)
    .replaceAll('{GachaType}', data.type)

  data.detail.text = data.detail.text
    .replaceAll('{GachaName}', data.name)
    .replaceAll('{GachaType}', data.type)

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

  return {
    props: {
      gacha: data,
    },
  }
}

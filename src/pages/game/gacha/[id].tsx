import {
  Card,
  Disclosure,
  Table,
  TableBody,
  TextFormat,
} from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { GachaIcon } from '@/components/Image'
import prisma from '@/lib/prisma'
import {
  GachaExplanationWordMaster,
  GachaMaster,
  GachaNotesWordMaster,
  GachaSummaryWordMaster,
} from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { formatTimeDetail } from 'utils'

export default function CardDetail({
  gacha,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('gacha:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <GachaIcon id={gacha.masterId} category={gacha.category} />

            <div className="mt-2">{gacha.name}</div>

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
          <Card title={t('gacha:descriptions')}>
            <Disclosure title={t('gacha:summary')}>
              <TextFormat>{gacha.summary.text}</TextFormat>
            </Disclosure>
            <Disclosure title={t('gacha:note')}>
              <TextFormat>{gacha.note.text}</TextFormat>
            </Disclosure>
            <Disclosure title={t('gacha:detail')}>
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
                  <CardItem key={item.id} data={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

type StaticPaths = {
  id: string
}

export const getStaticPaths: GetStaticPaths<StaticPaths> = async () => {
  const data = await prisma.gachaMaster.findMany({
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
  },
  StaticPaths
> = async ({ params }) => {
  if (!params) throw new Error('No path parameters found')

  const { id } = params

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

  return {
    props: {
      gacha: data,
    },
    revalidate: 1800,
  }
}

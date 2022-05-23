import { GetAggregationResult } from '@/api/event/aggregation'
import { Card, Disclosure, Modal, Table, TableBody } from '@/components/Basic'
import { EventIcon, Image } from '@/components/Image'
import prisma from '@/lib/prisma'
import { EventAggregationBaseMaster, EventMaster } from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React, { useState } from 'react'
import useSWR from 'swr'
import { formatTimeDetail, GetURLType } from 'utils'

const AggregationModal = ({
  id,
  onClose,
}: {
  id: string
  onClose: () => void
}) => {
  const { data: reqData, error } = useSWR<GetAggregationResult>(
    `/api/event/aggregation?detail=${id}`
  )

  if (!reqData) return <></>

  const data = reqData.data

  return (
    <Modal show showCloseBtn onClose={onClose} center>
      {data && <div>{data.aggregationType}</div>}
    </Modal>
  )
}

export default function EventDetail({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(event)
  const { t } = useTransition('')

  const [aggregationId, setAggregationId] = useState<string | null>(null)

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.event.name'), link: '/game/event' },
        {
          name: t('nav:game.event_detail'),
          link: ``,
        },
      ]}
      title={`${event.name}`}
    >
      {aggregationId && (
        <>
          <AggregationModal
            id={aggregationId}
            onClose={() => {
              setAggregationId(null)
            }}
          />
        </>
      )}
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('event:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <EventIcon id={event.masterId} />

            <div className="mt-2">{event.name}</div>

            <Table>
              <TableBody
                data={[
                  [t('event:id'), event.masterId],
                  [
                    t('event:reception_close_date'),
                    formatTimeDetail(event.receptionCloseDate),
                  ],
                  [
                    t('event:result_announcement_date'),
                    formatTimeDetail(event.resultAnnouncementDate),
                  ],
                  [
                    t('event:rank_fix_start_date'),
                    formatTimeDetail(event.rankFixStartDate),
                  ],
                  [
                    t('event:story_unlock_date'),
                    formatTimeDetail(event.storyUnlockDate),
                  ],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t('event:illustrations.name')}>
            <Disclosure title={t('event:illustrations.background')}>
              <Image
                urlType={GetURLType.EventBackground}
                parameter={[event.masterId]}
                width={2380}
                height={1440}
              />
            </Disclosure>
            <Disclosure title={t('event:illustrations.banner_event')}>
              <Image
                urlType={GetURLType.EventBanner}
                parameter={[event.masterId]}
                width={612}
                height={200}
              />
            </Disclosure>
            <Disclosure title={t('event:illustrations.banner_event_notice')}>
              <Image
                urlType={GetURLType.EventBannerNotice}
                parameter={[event.masterId]}
                width={612}
                height={200}
              />
            </Disclosure>
          </Card>
          {/* <Card
            title={t('event:datas')}
            bodyClassName="grid-1"
            className="mt-4"
          >
            {event.aggregations.map((item) => (
              <Card
                key={item.id}
                className="px-3 py-3 cursor-pointer"
                onClick={() => {
                  setAggregationId(item.id)
                }}
              >
                {item.aggregationType}
              </Card>
            ))}
          </Card> */}
        </div>

        {/* {data.episodeCharacters?.data?.length !== 0 && (
          <>
            <div className="subtitle">{t('gacha:pickup_cards')}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {data.episodeCharacters!.data!.map(
                  (item: CardEntity, index: React.Key | null | undefined) => (
                    <CardItem key={index} data={item} />
                  )
                )}
              </div>
            </div>
          </>
        )} */}
      </div>
    </MainLayout>
  )
}

type StaticPaths = {
  id: string
}

export const getStaticPaths: GetStaticPaths<StaticPaths> = async () => {
  const data = await prisma.eventMaster.findMany({
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
    event: EventMaster & {
      aggregations: EventAggregationBaseMaster[]
    }
  },
  StaticPaths
> = async ({ params }) => {
  if (!params) throw new Error('No path parameters found')

  const { id } = params

  const data = await prisma.eventMaster.findUnique({
    where: {
      id,
    },
    // select: {},
    include: {
      aggregations: true,
    },
  })

  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      event: data,
    },
    revalidate: 1800,
  }
}

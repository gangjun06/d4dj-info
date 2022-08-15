import { GetAggregationResult } from '@/api/event/aggregation'
import { Card, Disclosure, Modal, Table, TableBody } from '@/components/Basic'
import { CharacterIcon, EventIcon, Image } from '@/components/Elements/Image'
import prisma from '@/lib/prisma'
import { EventAggregationBaseMaster, EventMaster } from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React, { Fragment, useState } from 'react'
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
  episodeCharacters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      rootExtra={
        <div className="absolute w-screen h-screen -z-10">
          <Image
            urlType={GetURLType.EventBackground}
            parameter={[event.masterId]}
            region={event.region}
            layout="fill"
          />
        </div>
      }
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
            newDesign
          >
            <EventIcon id={event.masterId} region={event.region} />

            <div className="mb-2">{event.name}</div>

            <Table>
              <TableBody
                data={[
                  [t('event:id'), event.masterId],
                  [t('common:start_date'), formatTimeDetail(event.startDate)],
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
                  [t('common:end_date'), formatTimeDetail(event.endDate)],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t('event:illustrations.name')} newDesign>
            <Disclosure title={t('event:illustrations.background')} newDesign>
              <Image
                urlType={GetURLType.EventBackground}
                parameter={[event.masterId]}
                region={event.region}
                width={2380}
                height={1440}
              />
            </Disclosure>
            <Disclosure title={t('event:illustrations.banner_event')} newDesign>
              <Image
                urlType={GetURLType.EventBanner}
                parameter={[event.masterId]}
                region={event.region}
                width={612}
                height={200}
              />
            </Disclosure>
            <Disclosure
              title={t('event:illustrations.banner_event_notice')}
              newDesign
            >
              <Image
                urlType={GetURLType.EventBannerNotice}
                parameter={[event.masterId]}
                region={event.region}
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

        {episodeCharacters.length !== 0 && (
          <>
            <div className="subtitle">{t('event:episode_characters')}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {episodeCharacters.map((item, index) => (
                  <>
                    {item ? (
                      <Card
                        link={`/game/character/${item.id}`}
                        key={item.id}
                        bodyClassName="flex flex-col justify-center items-center"
                        newDesign
                      >
                        <CharacterIcon
                          alt={`character ${item.masterId}`}
                          id={item.masterId}
                        />
                        {item.fullNameEnglish || item.firstNameEnglish}
                      </Card>
                    ) : (
                      <Fragment key={index} />
                    )}
                  </>
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
  event: EventMaster & {
    aggregations: EventAggregationBaseMaster[]
  }
  episodeCharacters: ({
    id: string
    masterId: number
    firstNameEnglish: string
    fullNameEnglish: string
  } | null)[]
}> = async ({ query, res }) => {
  const { id } = query
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

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

  const episodeCharacters = await Promise.all(
    data.episodeCharacters.map((id) =>
      prisma.characterMaster.findUnique({
        where: { id: `${id}-${data.region}` },
        select: {
          id: true,
          masterId: true,
          firstNameEnglish: true,
          fullNameEnglish: true,
        },
      })
    )
  )

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

  return {
    props: {
      event: data,
      episodeCharacters: episodeCharacters,
    },
  }
}

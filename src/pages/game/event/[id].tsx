import { Card, Disclosure, Table, TableBody } from '@/components/Basic'
import { EventIcon, Image } from '@/components/Image'
import {
  EventDocument,
  EventEntity,
  EventQuery,
  EventQueryVariables,
} from '@/generated/graphql'
import { client } from '@/lib/apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { formatTimeDetail, GetURLType } from 'utils'

export default function EventDetail({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const data = event.attributes!

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
      title={`${data?.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('event:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <EventIcon id={data.masterID!} />

            <div className="mt-2">{data.name}</div>

            <Table>
              <TableBody
                data={[
                  [t('event:id'), event.id],
                  [
                    t('event:reception_close_date'),
                    formatTimeDetail(data.receptionCloseDate),
                  ],
                  [
                    t('event:result_announcement_date'),
                    formatTimeDetail(data.resultAnnouncementDate),
                  ],
                  [
                    t('event:rank_fix_start_date'),
                    formatTimeDetail(data.rankFixStartDate),
                  ],
                  [
                    t('event:story_unlock_date'),
                    formatTimeDetail(data.storyUnlockDate),
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
                parameter={[data.masterID]}
                width={2380}
                height={1440}
              />
            </Disclosure>
            <Disclosure title={t('event:illustrations.banner_event')}>
              <Image
                urlType={GetURLType.EventBanner}
                parameter={[data.masterID]}
                width={612}
                height={200}
              />
            </Disclosure>
            <Disclosure title={t('event:illustrations.banner_event_notice')}>
              <Image
                urlType={GetURLType.EventBannerNotice}
                parameter={[data.masterID]}
                width={612}
                height={200}
              />
            </Disclosure>
          </Card>
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

export const getServerSideProps: GetServerSideProps<{
  event: EventEntity
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query<EventQuery, EventQueryVariables>({
    query: EventDocument,
    variables: {
      eventId: id,
    },
    fetchPolicy: 'no-cache',
  })

  if (!data?.event?.data) {
    return { notFound: true }
  }

  return {
    props: {
      event: data.event!.data,
    },
  }
}

import { GetEventListReq, GetEventListRes, GET_EVENT_LIST } from '@/apollo/gql'
import { Card } from '@/components/Basic'
import { EventItem } from '@/components/Elements'
import { WaitQuery } from '@/components/Util'
import { useQuery } from '@apollo/client'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useState } from 'react'
import InfinityScroll from 'react-infinite-scroll-component'

export default function Event() {
  const { t } = useTransition('')
  const [hasMore, setHasMore] = useState<boolean>(true)

  const { data, loading, error, fetchMore } = useQuery<
    GetEventListRes,
    GetEventListReq
  >(GET_EVENT_LIST, {
    variables: {
      page: {
        take: 20,
        skip: 0,
      },
    },
  })

  const fetchData = async () => {
    const res = await fetchMore({
      variables: {
        page: {
          skip: data!.event.length > 0 ? 1 : 0,
          take: 20,
          after: data?.event[data?.event.length - 1].id,
        },
      },
    })
    if (((res.data as any).event as any[]).length < 20) {
      setHasMore(false)
    }
  }

  return (
    <MainLayout
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.event'), link: '/game/event' },
      ]}
      title={t('nav:game.event')}
    >
      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={data?.event.length || 0}
          next={fetchData}
          hasMore={hasMore}
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.event.map((item, index) => (
              <Card key={index} link={`/game/event/${item.id}`}>
                <EventItem data={item} />
              </Card>
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

import {
  GetMusicListReq,
  GetMusicListRes,
  GET_MUSIC_LIST,
  MusicSort,
  OrderType,
} from '@/apollo/gql'
import { Card } from '@/components/Basic'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { MusicIcon } from '@/components/Image'
import { WaitQuery } from '@/components/Util'
import { useQuery } from '@apollo/client'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InfinityScroll from 'react-infinite-scroll-component'
import { cleanArray, cleanArrayWithInt } from 'utils/array'
import {
  MusicCategoryCheckbox,
  MusicOrderRadio,
  UnitCheckbox,
} from 'utils/constants'

type FilterData = {
  category: string[]
  unit: string[]
  order: OrderType
  orderBy: MusicSort
}

export default function Music() {
  const { t } = useTransition('')
  const { handleSubmit, control, setValue } = useForm<FilterData>({
    defaultValues: { orderBy: MusicSort.ID, order: 'asc' },
  })
  const [reqData, setReqData] = useState<GetMusicListReq | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetMusicListRes,
    GetMusicListReq
  >(GET_MUSIC_LIST, {
    variables: {
      page: {
        take: 30,
        skip: 0,
      },
      filter: {},
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const reqData: GetMusicListReq = {
      filter: {
        category: cleanArray(data.category),
        unit: cleanArrayWithInt(data.unit),
      },
      sort: {
        name: data.orderBy,
        order: data.order,
      },
    }
    setReqData(reqData)
    const res = await refetch(reqData)
    if (((res.data as any).music as any[]).length < 30) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  })

  const fetchData = async () => {
    const res = await fetchMore({
      variables: {
        ...reqData,
        page: {
          skip: data!.music.length > 0 ? 1 : 0,
          take: 30,
          after: data?.music[data?.music.length - 1].id,
        },
      },
    })
    if (((res.data as any).music as any[]).length < 30) {
      setHasMore(false)
    }
  }
  return (
    <MainLayout
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.music'), link: '/game/music' },
      ]}
      title={t('nav:game.music')}
    >
      <Card title={t('common:filter')} className="mb-4">
        <form onSubmit={onSubmit}>
          <FormBlock label={t('music:category.name')}>
            <Checkbox
              name="category"
              control={control}
              list={MusicCategoryCheckbox(t)}
            />
          </FormBlock>
          <FormBlock label={t('common:unit.name')}>
            <Checkbox name="unit" control={control} list={UnitCheckbox(t)} />
          </FormBlock>
          <FormBlock label={t('common:sort_name')}>
            <Radio name="orderBy" control={control} list={MusicOrderRadio(t)} />
          </FormBlock>
          <button
            className="btn btn-sm btn-primary btn-outline"
            type="submit"
            onClick={() => setValue('order', 'asc')}
          >
            {t('common:search')}
          </button>
          <button
            className="ml-2 btn btn-sm btn-outline"
            onClick={() => setValue('order', 'desc')}
            type="submit"
          >
            {t('common:search_desc')}
          </button>
        </form>
      </Card>
      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={data?.music.length || 0}
          next={fetchData}
          hasMore={hasMore}
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.music.map((item) => (
              <Card
                key={item.id}
                bodyClassName="flex justify-center items-center flex-col"
                link={`/game/music/${item.id}`}
              >
                <MusicIcon id={item.id} />
                <div className="flex flex-row gap-x-2 mt-2">
                  {item.chart?.map((item, index) => (
                    <div className="badge badge-outline badge-md" key={index}>
                      {item.level}
                    </div>
                  ))}
                </div>
                <div className="mt-2">{item.name}</div>
                <div className="text-gray-600">
                  {item.unit?.name} -{' '}
                  {t(`music:category.${item.category.toLowerCase()}`)}
                </div>
              </Card>
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

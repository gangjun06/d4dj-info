import {
  GetMusicListReq,
  GetMusicListRes,
  GET_MUSIC_LIST,
  MusicSort,
  OrderType,
} from '@/apollo/gql'
import { SideOver } from '@/components/Basic'
import { MusicItem } from '@/components/Elements'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { WaitQuery } from '@/components/Util'
import { useQuery } from '@apollo/client'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
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
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('order', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('order', 'asc'), [setValue])

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
      titleSide={
        <button className="btn btn-primary btn-sm" onClick={openFilterSideOver}>
          <HiOutlineFilter size={22} />
        </button>
      }
    >
      <SideOver
        title={t('common:filter')}
        open={openFilter}
        onClose={closeFilterSideOver}
        asForm
        onSubmit={onSubmit}
        footer={
          <>
            <button
              className="btn btn-sm btn-primary btn-outline"
              type="submit"
              onClick={setOrderAsc}
            >
              {t('common:search')}
            </button>
            <button
              className="ml-2 btn btn-sm btn-outline"
              onClick={setOrderDesc}
              type="submit"
            >
              {t('common:search_desc')}
            </button>
          </>
        }
      >
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
      </SideOver>
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
              <MusicItem key={item.id} data={item} />
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

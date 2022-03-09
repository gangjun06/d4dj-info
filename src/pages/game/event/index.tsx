import { SideOver } from '@/components/Basic'
import { EventItem } from '@/components/Elements'
import { Checkbox, FormBlock } from '@/components/Form'
import { useSetting } from '@/components/Setting'
import { WaitQuery } from '@/components/Util'
import {
  CardFiltersInput,
  Enum_Event_Type,
  EventsQueryVariables,
  MusicsQueryVariables,
  useEventsQuery,
} from '@/generated/graphql'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfinityScroll from 'react-infinite-scroll-component'
import { cleanArray, generateFilter } from 'utils'
import { EventTypeCheckbox } from 'utils/constants'

type FilterData = {
  category: Enum_Event_Type[]
  sort: 'asc' | 'desc'
}

export default function EventList() {
  const { t } = useTransition('')
  const { region } = useSetting()
  const { handleSubmit, control, setValue } = useForm<FilterData>({
    defaultValues: { sort: 'desc' },
  })
  const [reqData, setReqData] = useState<EventsQueryVariables>({
    locale: region,
    pagination: {
      pageSize: 30,
      page: 1,
    },
    sort: ['masterID:desc'],
  })
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('sort', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('sort', 'asc'), [setValue])

  const { data, loading, error, refetch, fetchMore } = useEventsQuery({
    variables: reqData,
  })

  const onSubmit = handleSubmit(async (data) => {
    const reqData: MusicsQueryVariables = {
      filters: generateFilter<CardFiltersInput>({
        type: cleanArray(data.category),
      }),
      locale: region,
      pagination: {
        pageSize: 30,
        page: 1,
      },
      sort: [`masterID:${data.sort}`],
    }
    setReqData(reqData)
    await refetch(reqData)
  })

  const fetchData = async () => {
    await fetchMore({
      variables: {
        ...reqData,
        pagination: {
          ...(reqData ? reqData.pagination : {}),
          page: (data?.events?.meta.pagination.page || 1) + 1,
        },
      },
    })
  }

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.event'), link: '' },
      ]}
      title={t('nav:game.music')}
      titleSide={
        <button className="btn btn-primary btn-sm" onClick={openFilterSideOver}>
          <HiOutlineFilter size={22} />
        </button>
      }
    >
      <SideOver
        open={openFilter}
        onClose={closeFilterSideOver}
        title={t('common:filter')}
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
              className="btn btn-sm btn-outline"
              onClick={setOrderDesc}
              type="submit"
            >
              {t('common:search_desc')}
            </button>
          </>
        }
      >
        <FormBlock label={t('category')}>
          <Checkbox
            name="category"
            control={control}
            list={EventTypeCheckbox(t)}
          />
        </FormBlock>
      </SideOver>

      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={(data?.events?.data || []).length || 0}
          next={fetchData}
          hasMore={
            (data?.events?.meta.pagination.page || 0) <
            (data?.events?.meta.pagination.pageCount || 0)
          }
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.events?.data.map((item) => (
              <EventItem key={item.id} data={item} />
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

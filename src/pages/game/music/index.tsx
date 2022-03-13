import { SideOver } from '@/components/Basic'
import { MusicItem } from '@/components/Elements'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { useSetting } from '@/components/Setting'
import { WaitQuery } from '@/components/Util'
import {
  CardFiltersInput,
  MusicsQueryVariables,
  useMusicsQuery,
} from '@/generated/graphql'
import { MusicCategory, MusicSort, Unit } from '@/models/index'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfinityScroll from 'react-infinite-scroll-component'
import { cleanArray, cleanArrayWithInt, generateFilter } from 'utils'
import {
  MusicCategoryCheckbox,
  MusicSortRadio,
  UnitCheckbox,
} from 'utils/constants'

type FilterData = {
  category: MusicCategory[]
  unit: Unit[]
  sort: 'asc' | 'desc'
  sortBy: MusicSort
}

export default function MusicList() {
  const { t } = useTransition('')
  const { region } = useSetting()
  const { handleSubmit, control, setValue } = useForm<FilterData>({
    defaultValues: { sort: 'asc', sortBy: MusicSort.ID },
  })
  const [reqData, setReqData] = useState<MusicsQueryVariables>({
    locale: region,
    pagination: {
      pageSize: 30,
      page: 1,
    },
  })
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('sort', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('sort', 'asc'), [setValue])

  const { data, loading, error, refetch, fetchMore } = useMusicsQuery({
    variables: reqData,
  })

  const onSubmit = handleSubmit(async (data) => {
    const reqData: MusicsQueryVariables = {
      filters: generateFilter<CardFiltersInput>({
        category: cleanArray(data.category),
        'unit.masterID': cleanArrayWithInt(data.unit),
      }),
      locale: region,
      pagination: {
        pageSize: 30,
        page: 1,
      },
      sort: [`${data.sortBy}:${data.sort}`],
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
          page: (data?.musics?.meta.pagination.page || 1) + 1,
        },
      },
    })
  }

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.music'), link: '' },
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
        <FormBlock label={t('common:category')}>
          <Checkbox
            name="category"
            control={control}
            list={MusicCategoryCheckbox(t)}
          />
        </FormBlock>
        <FormBlock label={t('common:unit.name')}>
          <Checkbox name="unit" control={control} list={UnitCheckbox(t)} />
        </FormBlock>
        <FormBlock label={t('common:sort')}>
          <Radio name="sortBy" control={control} list={MusicSortRadio(t)} />
        </FormBlock>
      </SideOver>

      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={(data?.musics?.data || []).length || 0}
          next={fetchData}
          hasMore={
            (data?.musics?.meta.pagination.page || 0) <
            (data?.musics?.meta.pagination.pageCount || 0)
          }
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.musics?.data.map((item) => (
              <MusicItem key={item.id} data={item} />
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

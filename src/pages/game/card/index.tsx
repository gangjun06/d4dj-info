import { SideOver } from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { useSetting } from '@/components/Setting'
import { WaitQuery } from '@/components/Util'
import {
  CardFiltersInput,
  CardsQueryVariables,
  useCardsLazyQuery,
} from '@/generated/graphql'
import { Attribute, CardSort, Rarity, Unit } from '@/models/index'
import { DataListLayout } from 'layouts/datalist'
import MainLayout from 'layouts/main'
// import { Attribute } from 'models'
import useTransition from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { CardOptions } from 'pages/api/card'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfinityScroll from 'react-infinite-scroll-component'
import {
  cleanArrayWithInt,
  cleanForm,
  generateFilter,
  parseFilterQuery,
} from 'utils'
import {
  AttributeCheckbox,
  CardOrderRadio,
  CardRearityCheckbox,
  UnitCheckbox,
} from 'utils/constants'

type FilterData = {
  attribute: Attribute[]
  cardRearity: Rarity[]
  unit: Unit[]
  sort: 'asc' | 'desc'
  sortBy: CardSort
}

const CardList = () => {
  const { t } = useTransition('')
  return (
    <DataListLayout
      option={CardOptions}
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '/game/card' },
      ]}
      title={t('nav:game.card')}
    ></DataListLayout>
  )
}
export default CardList

const CardList2 = () => {
  const { t } = useTransition('')
  const { region } = useSetting()
  const router = useRouter()
  const { handleSubmit, control, setValue, register } = useForm<FilterData>({
    defaultValues: { sort: 'asc', sortBy: CardSort.ID },
  })
  const [reqData, setReqData] = useState<CardsQueryVariables>({
    cardsLocale: region,
    cardsPagination: {
      pageSize: 30,
      page: 1,
    },
  })
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('sort', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('sort', 'asc'), [setValue])

  const [loadCards, { data, loading, error, refetch, fetchMore }] =
    useCardsLazyQuery({
      variables: reqData,
    })

  const setReqDataWithFilter = useCallback(
    (data: FilterData) => {
      data.attribute = cleanArrayWithInt(data.attribute)
      data.cardRearity = cleanArrayWithInt(data.cardRearity)
      data.unit = cleanArrayWithInt(data.unit)
      const reqData: CardsQueryVariables = {
        cardsFilters: generateFilter<CardFiltersInput>({
          attribute: data.attribute,
          rarity: data.cardRearity,
          'character.unit.masterID': data.unit,
        }),
        cardsLocale: region,
        cardsPagination: {
          pageSize: 30,
          page: 1,
        },
        sort: [`${data.sortBy}:${data.sort}`],
      }
      setReqData(reqData)
    },
    [region]
  )

  useEffect(() => {
    const parsed = parseFilterQuery(router.query)
    if (parsed) setReqDataWithFilter(parsed)
    loadCards()
  }, [loadCards, router.query, setReqDataWithFilter])

  const onSubmit = handleSubmit(async (data) => {
    cleanForm(data)
    console.log(data)
    // setReqDataWithFilter(data)
    router.push(
      //@ts-ignore
      `/game/card?${new URLSearchParams(data).toString()}`,
      undefined,
      { shallow: true }
    )
    await refetch(reqData)
  })

  const fetchData = async () => {
    await fetchMore({
      variables: {
        ...reqData,
        cardsPagination: {
          ...(reqData ? reqData.cardsPagination : {}),
          page: (data?.cards?.meta.pagination.page || 1) + 1,
        },
      },
    })
  }

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '/game/card' },
      ]}
      title={t('nav:game.card')}
      titleSide={
        <button className="btn" onClick={openFilterSideOver}>
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
            <button className="btn-primary" type="submit" onClick={setOrderAsc}>
              {t('common:search')}
            </button>
            <button className="btn" onClick={setOrderDesc} type="submit">
              {t('common:search_desc')}
            </button>
          </>
        }
      >
        <FormBlock label={t('common:attribute.name')}>
          <Checkbox
            name="attribute"
            register={register}
            list={AttributeCheckbox(t)}
          />
        </FormBlock>
        <FormBlock label={t('card:rarity.name')}>
          <Checkbox
            name="cardRearity"
            register={register}
            list={CardRearityCheckbox(t)}
          />
        </FormBlock>
        <FormBlock label={t('common:unit.name')}>
          <Checkbox name="unit" register={register} list={UnitCheckbox(t)} />
        </FormBlock>
        <FormBlock label={t('common:sort')}>
          <Radio name="sortBy" register={register} list={CardOrderRadio(t)} />
        </FormBlock>
      </SideOver>

      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={(data?.cards?.data || []).length || 0}
          next={fetchData}
          hasMore={
            (data?.cards?.meta.pagination.page || 0) <
            (data?.cards?.meta.pagination.pageCount || 0)
          }
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.cards?.data.map((item, index) => (
              <CardItem key={index} data={item} />
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

import { SideOver } from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { useSetting } from '@/components/Setting'
import { WaitQuery } from '@/components/Util'
import { CardsQueryVariables, useCardsQuery } from '@/generated/graphql'
import { Attribute, CardSort, Rarity, Unit } from '@/models/index'
import MainLayout from 'layouts/main'
// import { Attribute } from 'models'
import useTransition from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfinityScroll from 'react-infinite-scroll-component'
import { cleanArrayWithInt } from 'utils'
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

export default function CardList() {
  const { t } = useTransition('')
  const { region } = useSetting()
  const { handleSubmit, control, setValue } = useForm<FilterData>({
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

  const { data, loading, error, refetch, fetchMore } = useCardsQuery({
    variables: reqData,
  })

  const onSubmit = handleSubmit(async (data) => {
    const reqData: CardsQueryVariables = {
      cardsFilters: {
        and: [
          {
            or: cleanArrayWithInt(data.attribute)!.map((item) => ({
              rarity: { eq: item },
            })),
          },
          {
            or: cleanArrayWithInt(data.cardRearity)!.map((item) => ({
              rarity: { eq: item },
            })),
          },
          {
            or: cleanArrayWithInt(data.unit)!.map((item) => ({
              character: {
                unit: {
                  masterID: {
                    eq: item,
                  },
                },
              },
            })),
          },
        ],
      },
      cardsLocale: region,
      cardsPagination: {
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
        <FormBlock label={t('common:attribute.name')}>
          <Checkbox
            name="attribute"
            control={control}
            list={AttributeCheckbox(t)}
          />
        </FormBlock>
        <FormBlock label={t('card:rarity.name')}>
          <Checkbox
            name="cardRearity"
            control={control}
            list={CardRearityCheckbox(t)}
          />
        </FormBlock>
        <FormBlock label={t('common:unit.name')}>
          <Checkbox name="unit" control={control} list={UnitCheckbox(t)} />
        </FormBlock>
        <FormBlock label={t('common:sort_name')}>
          <Radio name="sortBy" control={control} list={CardOrderRadio(t)} />
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

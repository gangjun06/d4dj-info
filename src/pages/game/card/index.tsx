import {
  CardSort,
  GetCardListReq,
  GetCardListRes,
  GET_CARD_LIST,
} from '@/apollo/gql'
import { SideOver } from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { WaitQuery } from '@/components/Util'
import { useQuery } from '@apollo/client'
import MainLayout from 'layouts/main'
import { Attribute } from 'models'
import useTransition from 'next-translate/useTranslation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfinityScroll from 'react-infinite-scroll-component'
import {
  AttributeCheckbox,
  CardOrderRadio,
  CardRearityCheckbox,
  UnitCheckbox,
} from 'utils'
import { cleanArray, cleanArrayWithInt } from 'utils/array'

type FilterData = {
  attribute: Attribute[]
  cardRearity: string[]
  unit: string[]
  order: 'asc' | 'desc'
  orderBy: CardSort
}

export default function CardList() {
  const { t } = useTransition('')
  const { handleSubmit, control, setValue } = useForm<FilterData>({
    defaultValues: { order: 'asc', orderBy: CardSort.ID },
  })
  const [reqData, setReqData] = useState<GetCardListReq | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('order', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('order', 'asc'), [setValue])

  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetCardListRes,
    GetCardListReq
  >(GET_CARD_LIST, {
    variables: {
      sort: {
        name: CardSort.ID,
        order: 'asc',
      },
      page: {
        take: 30,
        skip: 0,
      },
      filter: {},
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const reqData: GetCardListReq = {
      filter: {
        attribute: cleanArray(data.attribute)?.map((item) =>
          item.toUpperCase()
        ),
        rairity: cleanArrayWithInt(data.cardRearity),
        unit: cleanArrayWithInt(data.unit),
      },
      sort: {
        name: data.orderBy,
        order: data.order,
      },
    }
    setReqData(reqData)
    const res = await refetch(reqData)
    if (((res.data as any).card as any[]).length < 30) {
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
          skip: data!.card.length > 0 ? 1 : 0,
          take: 30,
          after: data?.card[data?.card.length - 1].id,
        },
      },
    })
    if (((res.data as any).card as any[]).length < 30) {
      setHasMore(false)
    }
  }

  return (
    <MainLayout
      breadThumbs={[
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
          <Radio name="orderBy" control={control} list={CardOrderRadio(t)} />
        </FormBlock>
      </SideOver>
      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={data?.card.length || 0}
          next={fetchData}
          hasMore={hasMore}
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.card.map((item, index) => (
              <CardItem key={index} data={item} />
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

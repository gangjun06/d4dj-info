import { Modal, SideOver, Table, TableBody } from '@/components/Basic'
import StampItem from '@/components/Elements/StampItem'
import { Checkbox, FormBlock, Input } from '@/components/Form'
import { useSetting } from '@/components/Setting'
import { WaitQuery } from '@/components/Util'
import {
  CardFiltersInput,
  Enum_Stamp_Category,
  MusicsQueryVariables,
  StampsQueryVariables,
  useStampQuery,
  useStampsQuery,
} from '@/generated/graphql'
import MainLayout from 'layouts/main'
import {
  default as useTransition,
  default as useTranslation,
} from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfinityScroll from 'react-infinite-scroll-component'
import { cleanArray, generateFilter, StampCategoryCheckbox } from 'utils'
import { StampIcon } from '../Image'

type FilterData = {
  category: Enum_Stamp_Category[]
  search: string
  sort: 'asc' | 'desc'
}

const StampModal = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { t } = useTranslation()
  const { data, loading } = useStampQuery({
    variables: {
      stampId: id,
    },
  })
  if (loading) {
    return <></>
  }
  const stamp = data?.stamp?.data?.attributes
  return (
    <Modal show={true} showCloseBtn onClose={onClose} center>
      <div>
        <StampIcon id={stamp!.masterID!} />
        <div className="text-md">{stamp?.name}</div>
        <div className="text-sm text-gray-500">{stamp?.description}</div>
        <Table>
          <TableBody
            data={[
              [t('common:id'), stamp?.masterID],
              [t('common:category'), stamp?.category],
            ]}
          />
        </Table>
      </div>
    </Modal>
  )
}

export default function StampPage() {
  const { t } = useTransition('')
  const { region } = useSetting()
  const { handleSubmit, control, register, setValue } = useForm<FilterData>({
    defaultValues: { sort: 'desc' },
  })
  const [reqData, setReqData] = useState<StampsQueryVariables>({
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

  const [modalID, setModalID] = useState<string | null>(null)

  const router = useRouter()

  const onCloseModal = useCallback(() => {
    setModalID(null)
    router.replace('/game/stamp', '/game/stamp', { shallow: true })
  }, [router])

  useEffect(() => {
    const find = router.asPath.match(/\d+/)
    if (find && find.length) setModalID(find[0])
  }, [router.asPath])

  const { data, loading, error, refetch, fetchMore } = useStampsQuery({
    variables: reqData,
  })

  const onSubmit = handleSubmit(async (data) => {
    const reqData: MusicsQueryVariables = {
      filters: {
        ...generateFilter<CardFiltersInput>({
          category: cleanArray(data.category),
        }),
        and: [
          {
            name: {
              contains: data.search,
            },
          },
        ],
      },
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
          page: (data?.stamps?.meta.pagination.page || 1) + 1,
        },
      },
    })
  }

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.stamp'), link: '' },
      ]}
      title={t('nav:game.stamp')}
      titleSide={
        <button className="btn" onClick={openFilterSideOver}>
          <HiOutlineFilter size={22} />
        </button>
      }
    >
      {modalID && <StampModal id={modalID} onClose={onCloseModal} />}
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
        <FormBlock label={t('common:category')}>
          <Checkbox
            name="category"
            register={register}
            list={StampCategoryCheckbox(t)}
          />
        </FormBlock>
        <FormBlock label={t('common:search')}>
          <Input
            name="search"
            placeholder="Enter the keyword..."
            register={register}
          />
        </FormBlock>
      </SideOver>

      <WaitQuery loading={loading} error={error}>
        <InfinityScroll
          dataLength={(data?.stamps?.data || []).length || 0}
          next={fetchData}
          hasMore={
            (data?.stamps?.meta.pagination.page || 0) <
            (data?.stamps?.meta.pagination.pageCount || 0)
          }
          scrollableTarget="mainContent"
          endMessage={<div className="my-2"></div>}
          loader={<div>Loading..</div>}
        >
          <div className="grid-1">
            {data?.stamps?.data.map((item) => (
              <StampItem key={item.id} data={item} />
            ))}
          </div>
        </InfinityScroll>
      </WaitQuery>
    </MainLayout>
  )
}

import { SideOver } from '@/components/Basic'
import { SimpleLoading } from '@/components/Elements'
import { Checkbox, FormBlock, Radio } from '@/components/Form'
import { FindListOption, FindListOptionSet, FindListType } from '@/models/index'
import axios from 'axios'
import MainLayout, { MainProps } from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { HiOutlineFilter } from 'react-icons/hi'
import InfiniteScroll from 'react-infinite-scroll-component'
import { cleanForm, parseFilterQuery } from 'utils'

interface props<T> extends MainProps {
  option: FindListOptionSet<T>
  children: (props: { data: T }) => ReactElement
}

const FormItemBuilder = ({
  type,
  label,
  name,
  options,
  register,
}: FindListOption & { register: UseFormRegister<any> }) => {
  const { t } = useTransition('')

  switch (type) {
    case FindListType.Checkbox:
      return (
        <FormBlock label={t(label)}>
          <Checkbox
            name={name}
            register={register}
            list={options.map(({ label, value, component }) => ({
              ...(label ? { label: t(label) } : {}),
              ...(component ? { component } : {}),
              value,
            }))}
          />
        </FormBlock>
      )
    case FindListType.Input:
      return (
        <FormBlock label={t(label)}>
          <></>
        </FormBlock>
      )
    case FindListType.Radio:
      return (
        <FormBlock label={t(label)}>
          <Radio
            name={name}
            register={register}
            list={options.map(({ label, value, component }) => ({
              ...(label ? { label: t(label) } : {}),
              ...(component ? { component } : {}),
              value,
            }))}
          />
        </FormBlock>
      )
    default:
      return <></>
  }
}

export const DataListLayout = <T,>({
  title,
  breadCrumbs,
  children,
  option,
}: props<T>) => {
  const router = useRouter()
  const { t } = useTransition('')

  const { handleSubmit, setValue, register } = useForm<any>({
    defaultValues: { sort: 'asc', sortBy: option.sort.default },
  })

  const [data, setData] = useState<T[]>([])
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<any>({})
  const [hasMore, setHasMore] = useState<boolean>(true)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('sort', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('sort', 'asc'), [setValue])

  const fetchData = useCallback(
    async (init?: boolean) => {
      setHasMore(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}${option.url}`,
        {
          params: {
            ...(init ? {} : { cursor: (data[data.length - 1] as any).id }),
            ...filter,
          },
        }
      )
      if (res.data.data.length < 30) {
        setHasMore(false)
      }
      setData(init ? res.data.data : (d) => d.concat(res.data.data))
    },
    [data, filter, option.url]
  )

  const onSubmit = handleSubmit(async (data) => {
    cleanForm(data)
    router.push(
      //@ts-ignore
      `${router.pathname}?${new URLSearchParams(data).toString()}`,
      undefined,
      { shallow: true }
    )
    setFilter(data)
  })

  useEffect(() => {
    fetchData(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    console.log(router)
    const parsed = parseFilterQuery(router.query)
    console.log(parsed)
    if (parsed) {
      setFilter(parsed)
      return
    }
    fetchData(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainLayout
      title={title}
      breadCrumbs={breadCrumbs}
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
        {Object.keys(option.fields).map((key) => (
          <FormItemBuilder
            key={key}
            register={register}
            {...option.fields[key]}
          />
        ))}
        <FormItemBuilder
          register={register}
          label="Sort"
          name="sortBy"
          options={option.sort.options}
          type={FindListType.Radio}
        />
      </SideOver>
      <InfiniteScroll
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center my-4">
            <SimpleLoading />
          </div>
        }
        scrollableTarget="mainContent"
        dataLength={data.length}
        endMessage={<div className="my-2"></div>}
      >
        <div className="grid-1">{data.map((data) => children({ data }))}</div>
      </InfiniteScroll>
    </MainLayout>
  )
}

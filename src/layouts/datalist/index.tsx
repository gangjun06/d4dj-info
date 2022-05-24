import { SideOver } from '@/components/Basic'
import { SimpleLoading } from '@/components/Elements'
import { Checkbox, FormBlock, Input, Radio } from '@/components/Form'
import { FindListField, FindListOptionSet, FindListType } from '@/models/index'
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
  extra?: ReactElement
}

const FormItemBuilder = ({
  type,
  label,
  name,
  options,
  placeholder,
  register,
}: FindListField & { register: UseFormRegister<any> }) => {
  const { t } = useTransition('')

  switch (type) {
    case FindListType.Checkbox:
      return (
        <FormBlock label={t(label)}>
          <Checkbox
            name={name}
            register={register}
            list={options!.map(({ label, value, component }) => ({
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
          <Input
            name={name}
            placeholder={placeholder ? t(placeholder) : ''}
            register={register}
          />
        </FormBlock>
      )
    case FindListType.Radio:
      return (
        <FormBlock label={t(label)}>
          <Radio
            name={name}
            register={register}
            list={options!.map(({ label, value, component }) => ({
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
  extra,
}: props<T>) => {
  const router = useRouter()
  const { t } = useTransition('')

  const { handleSubmit, setValue, getValues, register } = useForm<any>({
    defaultValues: {
      sort: option.sort.defaultOrder ?? 'asc',
      sortBy: option.sort.default,
    },
  })

  const [data, setData] = useState<T[]>([])
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [init, setInit] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('sort', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('sort', 'asc'), [setValue])

  const fetchData = async (init?: boolean) => {
    const cleanData = cleanForm(getValues())
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}${option.url}`, {
      params: {
        ...(init ? {} : { cursor: (data[data.length - 1] as any).id }),
        ...cleanData,
      },
    })
    if (res.data.data.length < 30) {
      setHasMore(false)
    }
    setData(init ? res.data.data : (d) => d.concat(res.data.data))
  }

  const onSubmit = handleSubmit(async (data: any) => {
    const cleanData = cleanForm(data)
    router.push(
      //@ts-ignore
      `${router.pathname}?${new URLSearchParams(cleanData).toString()}`,
      undefined,
      { shallow: true }
    )
    fetchData(true)
  })

  useEffect(() => {
    if (init) return
    if (router.asPath.includes('&') && Object.keys(router.query).length < 1)
      return
    const parsed = parseFilterQuery(router.query)
    if (parsed) {
      delete parsed['id']
      Object.keys(parsed).forEach((key) => {
        setValue(key, parsed[key])
      })
    }
    fetchData(true)
    setInit(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, router.query, setValue])

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
          label={'common:sort'}
          name="sortBy"
          options={option.sort.options}
          type={FindListType.Radio}
        />
      </SideOver>
      {extra}
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

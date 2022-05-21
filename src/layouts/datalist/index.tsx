import { SideOver } from '@/components/Basic'
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
import { cleanForm } from 'utils'

interface props<T> extends MainProps {
  option: FindListOptionSet
  children?: (data: any) => ReactElement
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
            list={options.map(({ label, value }) => ({
              label: t(label),
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
            list={options.map(({ label, value }) => ({
              label: t(label),
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
  option,
}: props<T>) => {
  const router = useRouter()
  const { t } = useTransition('')

  const { handleSubmit, control, setValue, register } = useForm<any>({
    defaultValues: { sort: 'asc' },
  })

  const [data, setData] = useState<T[]>([])

  const [openFilter, setOpenFilter] = useState<boolean>(false)

  const openFilterSideOver = useCallback(() => setOpenFilter(true), [])
  const closeFilterSideOver = useCallback(() => setOpenFilter(false), [])
  const setOrderDesc = useCallback(() => setValue('sort', 'desc'), [setValue])
  const setOrderAsc = useCallback(() => setValue('sort', 'asc'), [setValue])

  const onSubmit = handleSubmit(async (data) => {
    cleanForm(data)
    console.log(data)
    // // setReqDataWithFilter(data)
    // router.push(
    //   //@ts-ignore
    //   `/game/card?${new URLSearchParams(data).toString()}`,
    //   undefined,
    //   { shallow: true }
    // )
    // await refetch(reqData)
  })

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/${option.url}`
      )
      setData(res.data.cards)
    }
    fetch()
  }, [option.url])

  const fetchData = async () => {
    const res = await axios.get(`/${option.url}`, {
      params: {
        cursor: (data[data.length - 1] as any).id,
      },
    })
    setData(res.data)
  }

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
        <div></div>
        {Object.keys(option.fields).map((key) => (
          <FormItemBuilder
            key={key}
            register={register}
            {...option.fields[key]}
          />
        ))}
      </SideOver>
      <InfiniteScroll
        next={fetchData}
        hasMore={true}
        loader={<div>Loading...</div>}
        scrollableTarget="mainContent"
        dataLength={data.length}
        endMessage={<div className="my-2"></div>}
      >
        <div className="grid-1">
          {(data as any).map((item: any, index: number) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      </InfiniteScroll>
    </MainLayout>
  )
}

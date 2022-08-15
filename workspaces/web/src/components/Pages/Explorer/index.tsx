import { Card } from '@/components/Basic'
import { SimpleLoading } from '@/components/Elements'
import axios from 'axios'
import MainLayout from 'layouts/main'
import useTransition from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import {
  HiDocumentText,
  HiOutlineDatabase,
  HiOutlineFolder,
  HiOutlinePhotograph,
} from 'react-icons/hi'
import { formatFileSize, formatTimeDetail } from 'utils'

const Icon = ({ name }: { name: string }) => {
  switch (name.split('.').slice(-1)[0]) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <HiOutlinePhotograph />
    case 'json':
      return <HiOutlineDatabase />
    default:
      if (name.endsWith('/')) {
        return <HiOutlineFolder />
      }
      return <HiDocumentText />
  }
}

const Item = ({
  name,
  size,
  uploaded,
}: {
  name: string
  uploaded?: string
  size?: number
}) => {
  return (
    <Card
      className="px-2 py-2"
      bodyClassName="sm:flex justify-between"
      link={
        uploaded ? `https://cdn.d4dj.info/${name}` : `/tool/explorer/${name}`
      }
    >
      <div className="flex items-center gap-x-1.5">
        <Icon name={name} />
        {uploaded ? name.replace(/^.+\//, '') : name.split('/').slice(-2)[0]}
      </div>
      <div className="flex gap-x-4 justify-between text-right">
        {size && size !== 0 && (
          <>
            <span>{formatFileSize(size!)}</span>
            <span className="w-[7.6rem]">{formatTimeDetail(uploaded!)}</span>
          </>
        )}
      </div>
    </Card>
  )
}

const Explorer = () => {
  const { t } = useTransition('')
  const router = useRouter()
  const [data, setData] = useState<{
    objects: { key: string; uploaded: string; size: number }[]
    delimitedPrefixes: string[]
  } | null>(null)

  const path = useMemo(
    () => ((router?.query?.path as string[]) || []).join('/'),
    [router.query]
  )

  const breadCrumbs = useMemo(
    () =>
      ((router?.query?.path as string[]) || [])
        .reduce<{ name: string; path: string }[]>(
          (prev, cur) => [
            ...prev,
            {
              name: cur,
              path: prev[prev.length - 1]
                ? `${prev[prev.length - 1].path}/${cur}`
                : cur,
            },
          ],
          []
        )
        .map(({ name, path }) => ({
          name: name,
          link: `/tool/explorer/${path}`,
        })),
    [router.query]
  )

  useEffect(() => {
    const fetchData = async () => {
      setData(null)
      console.log(path)
      const res = await axios.get(
        `https://cdn.d4dj.info/?prefix=${
          path ? encodeURIComponent(path + '/') : ''
        }&delimiter=%2F`
      )
      setData(res.data)
    }
    fetchData()
  }, [path])

  return (
    <MainLayout
      title={
        (
          breadCrumbs[breadCrumbs.length - 1] || {
            name: t('nav:tool.explorer'),
          }
        ).name
      }
      breadCrumbs={[
        { name: t('nav:tool.name'), link: '' },
        { name: t('nav:tool.explorer'), link: '/tool/explorer' },
        ...breadCrumbs,
      ]}
    >
      {!data ? (
        <SimpleLoading />
      ) : (
        <div className="flex flex-col gap-y-2">
          {data.delimitedPrefixes.map((str) => (
            <Item key={str} name={str} />
          ))}
          {data.objects.map(({ key, size, uploaded }) => (
            <Item key={key} name={key} size={size} uploaded={uploaded} />
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default Explorer

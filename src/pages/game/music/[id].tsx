import { Card, Disclosure, Tab, Table, TableBody } from '@/components/Basic'
import { ChartRadar, ChartViewer } from '@/components/Chart'
import { MusicIcon } from '@/components/Image'
import {
  Enum_Componentmusicchartnotecount_Section,
  MusicDocument,
  MusicEntity,
  MusicQuery,
  MusicQueryVariables,
} from '@/generated/graphql'
import { client } from '@/lib/apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { formatTimeDetail } from 'utils'

const MusicDetailCard = ({ music }: { music: MusicEntity }) => {
  const { t } = useTransition('')
  const data = music.attributes!
  return (
    <Card
      title={t('music:info')}
      bodyClassName="flex justify-center flex-col items-center"
    >
      <MusicIcon id={data.masterID!} />
      <div className="flex flex-row gap-x-2 mt-2">
        {data.charts?.data.map(({ attributes, id }) => (
          <div className="badge badge-outline badge-md" key={id}>
            {attributes?.level}
          </div>
        ))}
      </div>
      <div className="mt-2">{data.name}</div>
      <div className="text-gray-600">
        {data.unit?.data?.attributes?.name} -{' '}
        {t(`music:category.${data.category?.toLowerCase()}`)}
      </div>
      <Table>
        <TableBody
          data={[
            [t('music:id'), data.masterID],
            [t('music:composer'), data.composer],
            [t('music:lyrist'), data.lyrist],
            [t('music:arranger'), data.arranger],
            [t('music:bpm'), data.musicBpm],
            [t('music:startdate'), formatTimeDetail(data.startDate)],
            [t('music:enddate'), formatTimeDetail(data.endDate)],
            [t('music:unit'), data.unit?.data?.attributes?.name],
          ]}
        />
      </Table>
    </Card>
  )
}

const MusicDetailCardMemo = React.memo(MusicDetailCard)

export default function CardDetail({
  music,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const data = music.attributes!
  const charts = data.charts?.data

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.music'), link: '/game/music' },
        {
          name: t('nav:game.music_detail'),
          link: ``,
        },
      ]}
      title={`${data.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <MusicDetailCardMemo music={music} />
        </div>
        <div className="col-span-1 md:col-span-2 gap-y-4 grid grid-flow-row">
          <Card title={t('Medly')}>
            <Tab.Group>
              <Tab.List>
                {data.musicMix?.map((data) => (
                  <Tab.Item key={data!.id}>{data?.section}</Tab.Item>
                ))}
              </Tab.List>
              <Tab.Panels>
                {data.musicMix?.map((item) => (
                  <Tab.Panel key={item!.id}>
                    <Table>
                      <TableBody
                        data={[[t('music:chart_designer'), item?.section]]}
                      />
                    </Table>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </Card>
          <Card title={t('charts')}>
            <Tab.Group>
              <Tab.List>
                {charts?.map(({ id, attributes: data }) => (
                  <Tab.Item key={id}>
                    {data?.difficulty} ({data?.level})
                  </Tab.Item>
                ))}
              </Tab.List>
              <Tab.Panels>
                {charts?.map(({ id, attributes: chart }) => (
                  <Tab.Panel key={id}>
                    <Table>
                      <TableBody
                        data={[
                          [
                            t('music:note_count'),
                            chart?.chartNoteCount?.find(
                              (item) =>
                                item?.section ===
                                Enum_Componentmusicchartnotecount_Section.Full
                            )?.count,
                          ],
                          [
                            t('music:chart_designer'),
                            chart?.designer?.data?.attributes?.name,
                          ],
                        ]}
                      />
                    </Table>
                    <Disclosure title={t('music:trends')}>
                      <div className="max-w-sm">
                        <ChartRadar
                          title={chart?.difficulty || 'X'}
                          data={chart?.trends || {}}
                        />
                      </div>
                    </Disclosure>
                    <Disclosure title={t('music:chart_preview')}>
                      <ChartViewer
                        name={data.name!}
                        chartID={chart!.masterID!}
                      />
                    </Disclosure>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  music: MusicEntity
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query<MusicQuery, MusicQueryVariables>({
    query: MusicDocument,
    variables: {
      musicId: id,
    },
    fetchPolicy: 'no-cache',
  })

  if (!data?.music?.data) {
    return { notFound: true }
  }

  return {
    props: {
      music: data.music!.data as MusicEntity,
    },
  }
}

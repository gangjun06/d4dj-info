import { Card, Disclosure, Tab, Table, TableBody } from '@/components/Basic'
import { ChartRadar, ChartViewer } from '@/components/Chart'
import { MusicIcon } from '@/components/Elements/Image'
import prisma from '@/lib/prisma'
import { ChartDifficulty, MusicMaster, MusicMixMaster } from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { convertIDNum, formatTimeDetail } from 'utils'

const MusicDetailCard = ({
  music,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTransition('')
  return (
    <Card
      title={t('music:info')}
      bodyClassName="flex justify-center flex-col items-center"
    >
      <MusicIcon id={music.masterId} />
      <div className="badge mt-2">
        {music.charts.map(({ level }) => (
          <div key={level}>{level}</div>
        ))}
      </div>
      <div className="mt-2">{music.name}</div>
      <div className="text-gray-600">
        {/* {data.unit?.data?.attributes?.name} -{' '} */}
        {t(`music:category.${music.category?.toLowerCase()}`)}
      </div>
      <Table>
        <TableBody
          data={[
            [t('common:id'), music.masterId],
            [t('music:composer'), music.composer],
            [t('music:lyrist'), music.lyrist],
            [t('music:arranger'), music.arranger],
            [t('music:bpm'), music.musicBpm],
            [t('common:start_date'), formatTimeDetail(music.startDate)],
            [t('common:end_date'), formatTimeDetail(music.endDate)],
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
      title={`${music.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <MusicDetailCardMemo music={music} />
        </div>
        <div className="col-span-1 md:col-span-2 gap-y-4 grid grid-flow-row">
          {(music.musicMixes.length || 0) > 0 && (
            <Card title={t('music:medly')}>
              <Tab.Group>
                <Tab.List>
                  {music.musicMixes.map((data) => (
                    <Tab.Item key={data!.id}>{data?.section}</Tab.Item>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  {music.musicMixes.map((item) => (
                    <Tab.Panel key={item!.id}>
                      <Table>
                        <TableBody
                          data={[
                            [t('music:section'), item?.section],
                            [t('music:start_time'), item?.startTime],
                            [t('music:start_time_bpm'), item?.startTimeBpm],
                            [t('music:end_time'), item?.endTime],
                            [t('music:end_time_bpm'), item?.endTimeBpm],
                            [
                              t('music:long_mix_start'),
                              item?.enableLongMixStart,
                            ],
                            [t('music:long_mix_end'), item?.enableLongMixEnd],
                          ]}
                        />
                      </Table>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </Card>
          )}
          <Card title={t('music:chart_info')} className="overflow-hidden">
            <Tab.Group>
              <Tab.List>
                {music.charts?.map(({ id, difficulty, level }) => (
                  <Tab.Item key={id}>
                    {difficulty} ({level})
                  </Tab.Item>
                ))}
              </Tab.List>
              <Tab.Panels>
                {music.charts?.map(({ trends, difficulty, id, designer }) => (
                  <Tab.Panel key={id}>
                    <Table className="mb-2">
                      <TableBody
                        data={[
                          // [
                          //   t('music:note_count'),
                          //   chart?.chartNoteCount?.find(
                          //     (item) =>
                          //       item?.section ===
                          //       Enum_Componentmusicchartnotecount_Section.Full
                          //   )?.count,
                          // ],
                          [t('music:chart_designer'), designer],
                        ]}
                      />
                    </Table>
                    <Disclosure title={t('music:trends')}>
                      <div className="max-w-sm">
                        <ChartRadar
                          title={difficulty}
                          data={{
                            notes: trends[0],
                            danger: trends[1],
                            scratch: trends[2],
                            effect: trends[3],
                            technique: trends[4],
                          }}
                        />
                      </div>
                    </Disclosure>
                    <Disclosure title={t('music:chart_preview')}>
                      <ChartViewer
                        name={music.name}
                        chartID={convertIDNum(id)}
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
  music: MusicMaster & {
    charts: {
      id: string
      level: number
      trends: number[]
      difficulty: ChartDifficulty
      designer: {
        name: string
      }
    }[]
    musicMixes: MusicMixMaster[]
  }
}> = async ({ query, res }) => {
  const { id } = query
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const data = await prisma.musicMaster.findUnique({
    where: {
      id,
    },
    include: {
      charts: {
        select: {
          id: true,
          level: true,
          trends: true,
          difficulty: true,
          designer: {
            select: {
              name: true,
            },
          },
        },
      },
      musicMixes: true,
    },
  })

  if (!data) {
    return {
      notFound: true,
    }
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
  return {
    props: {
      music: data,
    },
  }
}

import { GetIndexReq, GetIndexRes, GET_INDEX_DATA } from '@/apollo/gql'
import { Card } from '@/components/Basic'
import { EventItemContent } from '@/components/elements'
import { GachaItemContent } from '@/components/elements/GachaItem'
import MainLayout from 'layouts/main'
import { GetServerSideProps } from 'next'
import Trans from 'next-translate/Trans'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { client } from '../apollo'

const links = [
  ['https://d4dj-pj.com', 'official_website'],
  [],
  ['https://www.youtube.com/channel/UCNWWdKniJyzQA3RiJ5LMoVw ', 'youtube'],
  ['https://instagram.com/d4dj_official/', 'instagram'],
  ['https://twitter.com/D4DJ_gm', 'twitter_d4dj_gm'],
  ['https://twitter.com/D4DJ_pj', 'twitter_d4dj_pj'],
  ['https://twitter.com/D4DJ_pj_EN', 'twitter_d4dj_pj_EN'],
  [],
  ['https://gall.dcinside.com/mgallery/board/lists?id=d4dj', 'community_gall'],
  ['https://discord.gg/d4dj', 'community_discord'],
]

export default function Home({ data }: { data: GetIndexRes }) {
  const { t } = useTransition('')
  return (
    <MainLayout
      title={t('nav:main.dashboard')}
      breadThumbs={[
        { name: t('nav:main.name'), link: '' },
        { name: t('nav:main.dashboard'), link: '/' },
      ]}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('index:recent_event')}
            link={`/game/event/${data.event[0].id}`}
            className="h-full"
          >
            {data.event.map((item) => (
              <EventItemContent data={item} key={item.id} />
            ))}
          </Card>
        </div>
        <div className="col-span-1">
          <Card
            className="h-full"
            title={t('index:recent_gacha')}
            link={`/game/gacha/${data.gacha[0].id}`}
          >
            {data.gacha.map((item) => (
              <GachaItemContent data={item} key={item.id} />
            ))}
          </Card>
        </div>
        <div className="col-span-1">
          <Card title={t('index:related_links')} className="h-full">
            {links.map((item, index) => (
              <>
                {item.length ? (
                  <div key={index}>
                    <a
                      href={item[0]}
                      className="link link-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(`index:links.${item[1]}`)}
                    </a>
                  </div>
                ) : (
                  <br key={index} />
                )}
              </>
            ))}
          </Card>
        </div>
        <div className="col-span-1">
          <Card title={t('index:info.name')} className="h-full">
            <Trans
              i18nKey="index:info.content"
              defaultTrans=""
              components={{
                div: <div />,
                br: <br />,
                b: <b />,
                mailto: (
                  <a
                    href="mailto:me@gangjun.dev"
                    className="link link-primary"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
              }}
            />
          </Card>
        </div>
        <div className="col-span-1">
          <Card title={t('index:contribute.name')} className="h-full">
            <div className="mb-2">{t('index:contribute.content')}</div>
            <div className="flex flex-col gap-y-1">
              <Trans
                i18nKey="index:contribute.links"
                defaultTrans=""
                components={{
                  a1: (
                    <a
                      href="https://github.com/gangjun06/d4dj-info"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                  a2: (
                    <a
                      href="https://github.com/gangjun06/d4dj-info-backend"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                  a3: (
                    <a
                      href="https://github.com/gangjun06/d4dj-crawler"
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                }}
              />
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <Card title={t('index:donate.name')} className="h-full">
            <div>{t('index:donate.content')}</div>
            <div className="flex gap-x-2">
              <a href="https://toss.me/gangjun" className="link link-primary">
                Toss
              </a>
              <a href="https://paypal.me/gangjun" className="link link-primary">
                Paypal
              </a>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{ data: GetIndexRes }> =
  async () => {
    const { data } = await client.query<GetIndexRes, GetIndexReq>({
      query: GET_INDEX_DATA,
      variables: {
        eventPage: { take: 1 },
        gachaPage: { take: 1 },
      },
      fetchPolicy: 'no-cache',
    })

    if (!data) {
      return { notFound: true }
    }

    return {
      props: {
        data,
      },
    }
  }

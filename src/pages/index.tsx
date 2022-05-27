import { Card } from '@/components/Basic'
import { Link } from '@/components/Basic/Link'
import { EventItem, GachaItem } from '@/components/Elements'
import prisma from '@/lib/prisma'
import { EventMaster, GachaMaster } from '@prisma/client'
import fs from 'fs'
import MainLayout from 'layouts/main'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import useTransition from 'next-translate/useTranslation'
import path from 'path'
import React from 'react'

export default function Home({
  gachas,
  events,
  mdxContribute,
  mdxInfo,
  mdxDonate,
  mdxRelated,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTransition('')
  return (
    <MainLayout
      title={t('nav:main.dashboard')}
      breadCrumbs={[
        { name: t('nav:main.name'), link: '' },
        { name: t('nav:main.dashboard'), link: '/' },
      ]}
    >
      <div className="grid-5">
        <Card
          title={t('common:recent_event')}
          className="col-span-1"
          bodyClassName="grid grid-col gap-4 overflow-y-scroll max-h-72"
        >
          {events.map((item) => (
            <EventItem
              data={item}
              key={item.id}
              className="px-1.5 py-1.5 h-max"
            />
          ))}
        </Card>
        <Card
          title={t('common:recent_gacha')}
          className="col-span-1"
          bodyClassName="grid grid-col gap-4 overflow-y-scroll max-h-72"
        >
          {gachas.map((item) => (
            <GachaItem
              // noImage
              data={item}
              key={item.id}
              className="px-1.5 py-1.5 h-max"
            />
          ))}
        </Card>
        <Card
          className="col-span-1"
          bodyClassName="flex flex-col gap-y-1 text-gray-700"
          title={t('common:related_link')}
        >
          <MDXRemote {...mdxRelated} components={{ Link }} />
        </Card>
        <Card
          className="col-span-1"
          bodyClassName="flex flex-col gap-y-1 text-gray-700"
          title={t('common:siteinfo')}
        >
          <MDXRemote {...mdxContribute} components={{ Link }} />
        </Card>
        <Card
          className="col-span-1"
          bodyClassName="flex flex-col gap-y-1 text-gray-700"
          title={t('common:contribute')}
        >
          <MDXRemote {...mdxInfo} components={{ Link }} />
        </Card>
        <Card
          className="col-span-1"
          bodyClassName="flex flex-col gap-y-1 text-gray-700"
          title={t('common:donate')}
        >
          <MDXRemote {...mdxDonate} components={{ Link }} />
        </Card>
      </div>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<{
  events: EventMaster[]
  gachas: GachaMaster[]
  mdxContribute: MDXRemoteSerializeResult
  mdxInfo: MDXRemoteSerializeResult
  mdxDonate: MDXRemoteSerializeResult
  mdxRelated: MDXRemoteSerializeResult
}> = async ({ locale }) => {
  const infoMdx = fs.readFileSync(
    path.join(__dirname, `../../../contents/${locale}/index-info.mdx`),
    'utf-8'
  )
  const donateMdx = fs.readFileSync(
    path.join(__dirname, `../../../contents/${locale}/index-donate.mdx`),
    'utf-8'
  )
  const contributeMdx = fs.readFileSync(
    path.join(__dirname, `../../../contents/${locale}/index-contribute.mdx`),
    'utf-8'
  )
  const relatedMdx = fs.readFileSync(
    path.join(__dirname, `../../../contents/${locale}/index-related.mdx`),
    'utf-8'
  )

  const mdxInfo = await serialize(infoMdx)
  const mdxDonate = await serialize(donateMdx)
  const mdxContribute = await serialize(contributeMdx)
  const mdxRelated = await serialize(relatedMdx)

  const events = await prisma.eventMaster.findMany({
    where: {
      endDate: {
        gt: new Date(),
        lt: '2096-10-02T07:06:40Z',
      },
    },
  })
  const gachas = await prisma.gachaMaster.findMany({
    where: {
      endDate: {
        gt: new Date(),
        lt: '2096-10-02T07:06:40Z',
      },
    },
  })

  return {
    props: {
      events: events || [],
      gachas: gachas || [],
      mdxContribute,
      mdxDonate,
      mdxInfo,
      mdxRelated,
    },
    revalidate: 3600,
  }
}

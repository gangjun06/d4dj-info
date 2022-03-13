import { Card, Disclosure, Table, TableBody } from '@/components/Basic'
import { CardItem } from '@/components/Elements'
import { GachaIcon } from '@/components/Image'
import {
  GachaDocument,
  GachaEntity,
  GachaQuery,
  GachaQueryVariables,
} from '@/generated/graphql'
import { client } from '@/lib/apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import React from 'react'
import { formatTimeDetail } from 'utils'

export default function CardDetail({
  gacha,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const data = gacha.attributes!

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.gacha'), link: '/game/gacha' },
        {
          name: t('nav:game.gacha_detail'),
          link: ``,
        },
      ]}
      title={`${data?.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('gacha:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <GachaIcon id={data.masterID!} category={data.category!} />

            <div className="mt-2">{data.name}</div>

            <Table>
              <TableBody
                data={[
                  [t('common:id'), data.masterID],
                  [t('common:start_date'), formatTimeDetail(data.startDate)],
                  [t('common:end_date'), formatTimeDetail(data.endDate)],
                  [t('common:type'), data.type],
                  [t('common:category'), data.category],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t('gacha:descriptions')}>
            <Disclosure title={t('gacha:note')}>
              <div>{data.note}</div>
            </Disclosure>
            <Disclosure title={t('gacha:detail')}>
              <div>{data.detail}</div>
            </Disclosure>
          </Card>
        </div>

        {data.pickUpCards?.data?.length !== 0 && (
          <>
            <div className="subtitle">{t('gacha:pickup_cards')}</div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid-1">
                {data.pickUpCards!.data!.map((item, index) => (
                  <CardItem key={index} data={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  gacha: GachaEntity
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query<GachaQuery, GachaQueryVariables>({
    query: GachaDocument,
    variables: {
      gachaId: id,
    },
    fetchPolicy: 'no-cache',
  })

  if (!data?.gacha?.data) {
    return { notFound: true }
  }

  return {
    props: {
      gacha: data.gacha!.data,
    },
  }
}

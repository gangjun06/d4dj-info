import { GetGachaReq, GetGachaRes, GET_GACHA_DETAIL } from '@/apollo/gql'
import { Card, Disclosure, Table, TableBody } from '@/components/Basic'
import { CardItem } from '@/components/elements'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { Gacha, Gacha as GachaModel, GachaCategory } from 'models'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import Image from 'next/image'
import { formatTimeDetail, myLoader, pad } from 'utils'

const canUseBanner = (item: Gacha) =>
  item.category !== GachaCategory.Tutorial &&
  item.category !== GachaCategory.Birthday

export default function GachaDetail({
  gacha,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const useBanner = canUseBanner(gacha)

  return (
    <MainLayout
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.gacha'), link: '/game/gacha' },
        {
          name: t('nav:game.gacha_detail'),
          link: `/game/event/${gacha.id}`,
        },
      ]}
      title={`${gacha.name}`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('gacha:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={
                useBanner
                  ? `ondemand/banner/banner_gacha_${pad(
                      gacha.id,
                      gacha.id < 10 ? 4 : 5
                    )}.png`
                  : `ondemand/gacha/top/banner/${gacha.id}.png`
              }
              width={useBanner ? 612 : 324}
              alt={gacha.id.toString()}
              height={useBanner ? 200 : 172}
            />
            <div className="mt-2">{gacha.name}</div>
            <div className="text-gray-600">{gacha.summary}</div>

            <Table>
              <TableBody
                data={[
                  [t('gacha:id'), gacha.id],
                  [t('gacha:startdate'), formatTimeDetail(gacha.startDate)],
                  [t('gacha:enddate'), formatTimeDetail(gacha.endDate)],
                  [t('gacha:type'), gacha.type],
                  [t('gacha:category'), gacha.category],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card>
            <h2 className="card-title">Descriptions</h2>
            <Disclosure title={t('gacha:note')}>
              <div>{gacha.note}</div>
            </Disclosure>
            <Disclosure title={t('gacha:detail')}>
              <div>{gacha.detail}</div>
            </Disclosure>
          </Card>
        </div>
        <div className="subtitle">{t('gacha:pickup_cards')}</div>
        <div className="col-span-1 md:col-span-3">
          <div className="grid-1">
            {gacha.pickUpCards!.map((item, index) => (
              <CardItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  gacha: GachaModel
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query<GetGachaRes, GetGachaReq>({
    query: GET_GACHA_DETAIL,
    variables: {
      filter: {
        id: parseInt(id as string),
      },
    },
    fetchPolicy: 'no-cache',
  })

  if (!data.gacha.length) {
    return { notFound: true }
  }

  return {
    props: {
      gacha: data.gacha[0],
    },
  }
}

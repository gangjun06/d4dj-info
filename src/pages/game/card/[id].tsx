import { GetCardReq, GetCardRes, GET_CARD_DETAIL } from '@/apollo/gql'
import { Card, Disclosure, Table, TableBody } from '@/components/Basic'
import { client } from 'apollo'
import MainLayout from 'layouts/main'
import { Card as CardModel } from 'models'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import Image from 'next/image'
import { formatTimeDetail, myLoader, pad } from 'utils'
import { createLive2DShare } from 'utils/live2d'
export default function CardDetail({
  card,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')

  return (
    <MainLayout
      breadThumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '/game/card' },
        { name: t('nav:game.card_detail'), link: `/game/card/${card.id}` },
      ]}
      title={`${card.cardName} (${
        card.character?.fullNameEnglish || card.character?.firstNameEnglish
      })`}
    >
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('card:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <Image
              loader={myLoader}
              src={`ondemand/card_icon/card_icon_${pad(card.id, 9)}_${
                card.rarity > 2 ? '1' : '0'
              }.jpg`}
              width="128"
              alt={'card image'}
              height="128"
            />
            <div className="flex flex-row gap-x-2 mt-2">
              <div className="badge badge-outline badge-md">
                {t(`card:rarity.${card.rarity}`)}
              </div>
              <div className="badge badge-outline badge-md">
                {card.attribute}
              </div>
            </div>
            <div className="mt-2">{card.cardName}</div>
            <div className="text-gray-600">
              {card.character?.fullNameEnglish ||
                card.character?.firstNameEnglish}{' '}
              - {card.character?.unit?.name}
            </div>
            <Table>
              <TableBody
                data={[
                  [t('card:id'), card.id],
                  [t('card:skill_name'), card.skillName],
                  [t('card:parameter.heart'), card.maxParameters![0]],
                  [t('card:parameter.technique'), card.maxParameters![1]],
                  [t('card:parameter.physical'), card.maxParameters![2]],
                  [
                    t('card:parameter.total'),
                    card.maxParameters!.reduce((a, b) => a + b, 0),
                  ],
                  [t('card:startdate'), formatTimeDetail(card.startDate!)],
                  [t('card:enddate'), formatTimeDetail(card.endDate!)],
                  card.rarity > 2
                    ? [
                        t('nav:live2d'),
                        {
                          link: createLive2DShare([
                            {
                              name: card.cardName,
                              model: `live2d_card_chara_${pad(card.id, 9)}`,
                            },
                          ]),
                          name: t('nav:live2d'),
                        },
                      ]
                    : [],
                ]}
              />
            </Table>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Card title={t('card:illustrations.name')}>
            <Disclosure title={t('card:illustrations.sd')}>
              <div className="flex items-center justify-center flex-wrap">
                {['00', '01', '02', '10', '11', '12'].map((item) => (
                  <div className="h-72 w-48 relative" key={item}>
                    <Image
                      loader={myLoader}
                      src={`ondemand/sd_card_chara/sd_card_chara_${pad(
                        card.id,
                        9
                      )}_${item}.png`}
                      layout="fill"
                      objectFit="contain"
                      alt={`card sd image`}
                    />
                  </div>
                ))}
              </div>
            </Disclosure>
            <Disclosure title={t('card:illustrations.transparent')}>
              <div className="flex-center">
                <Image
                  loader={myLoader}
                  src={`AssetBundles/images/card_chara_transparent_${pad(
                    card.id,
                    9
                  )}_0.png`}
                  width={920}
                  height={770}
                  alt={`transparent image`}
                />
              </div>
            </Disclosure>
            {card.rarity > 2 && (
              <Disclosure title={t('card:illustrations.transparent1')}>
                <div className="flex-center">
                  <Image
                    loader={myLoader}
                    src={`AssetBundles/images/card_chara_transparent_${pad(
                      card.id,
                      9
                    )}_1.png`}
                    width={920}
                    height={770}
                    alt={`transparent image`}
                  />
                </div>
              </Disclosure>
            )}
            {card.rarity !== 7 && (
              <Disclosure title={t('card:illustrations.illustration')}>
                <div className="flex-center">
                  <Image
                    loader={myLoader}
                    src={`ondemand/card_chara/card_chara_${pad(
                      card.id,
                      9
                    )}_0.jpg`}
                    width={764}
                    height={508}
                    alt={`card image`}
                  />
                </div>
              </Disclosure>
            )}
            {card.rarity > 2 && (
              <Disclosure title={t('card:illustrations.illustration1')}>
                <div className="flex-center">
                  <Image
                    loader={myLoader}
                    src={`ondemand/card_chara/card_chara_${pad(
                      card.id,
                      9
                    )}_1.jpg`}
                    width={764}
                    height={508}
                    alt={`card image`}
                  />
                </div>
              </Disclosure>
            )}
            <Disclosure title={t('card:illustrations.icon')}>
              <div className="flex-center gap-x-1">
                {card.rarity !== 7 && (
                  <Image
                    loader={myLoader}
                    src={`ondemand/card_icon/card_icon_${pad(
                      card.id,
                      9
                    )}_0.jpg`}
                    width={258}
                    height={258}
                    alt={`card image`}
                  />
                )}
                {card.rarity > 2 && (
                  <Image
                    loader={myLoader}
                    src={`ondemand/card_icon/card_icon_${pad(
                      card.id,
                      9
                    )}_1.jpg`}
                    width={258}
                    height={258}
                    alt={`card image`}
                  />
                )}
              </div>
            </Disclosure>
            <Disclosure title={t('card:illustrations.big_icon')}>
              <div className="flex-center w-full gap-x-1">
                {card.rarity !== 7 && (
                  <Image
                    loader={myLoader}
                    src={`ondemand/card_bigIcon/card_bigIcon_${pad(
                      card.id,
                      9
                    )}_0.jpg`}
                    width={344}
                    height={426}
                    alt={`card image`}
                  />
                )}
                {card.rarity > 2 && (
                  <Image
                    loader={myLoader}
                    src={`ondemand/card_bigIcon/card_bigIcon_${pad(
                      card.id,
                      9
                    )}_1.jpg`}
                    width={344}
                    height={426}
                    alt={`card image`}
                  />
                )}
              </div>
            </Disclosure>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{ card: CardModel }> =
  async (context) => {
    const id = context.query.id
    if (typeof id !== 'string') {
      return {
        notFound: true,
      }
    }

    const { data } = await client.query<GetCardRes, GetCardReq>({
      query: GET_CARD_DETAIL,
      variables: {
        filter: {
          id: parseInt(id as string),
        },
      },
      fetchPolicy: 'no-cache',
    })

    if (!data) {
      return { notFound: true }
    }

    return {
      props: {
        card: data.card[0],
      },
    }
  }

import { Card, Disclosure, Modal, Table, TableBody } from '@/components/Basic'
import { CardIcon, Image } from '@/components/Image'
import {
  CardDocument,
  CardQuery,
  CardQueryVariables,
} from '@/generated/graphql'
import { client } from '@/lib/apollo'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import { useState } from 'react'
import { formatTimeDetail, GetURLType, pad } from 'utils'
import { createLive2DShare } from 'utils/live2d'

export default function CardDetail({
  card,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const [showSkill, setShowSkill] = useState<boolean>(false)

  const maxParameters = card.maxParameters!
  const character = card.character?.data?.attributes || {}
  const unit = character?.unit?.data?.attributes || { name: 'X', masterID: 50 }
  const skill = card.skill?.data?.attributes || {}

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '/game/card' },
        { name: t('nav:game.card_detail'), link: `` },
      ]}
      title={`${card.cardName} (${
        character?.fullNameEnglish || character?.firstNameEnglish
      })`}
    >
      <Modal show={showSkill} onClose={() => setShowSkill(false)} showCloseBtn>
        <Table>
          <TableBody
            data={[
              [t('card:skill.id'), skill.masterID],
              [t('card:skill_name'), card.skillName],
              [t('card:skill.minRecovery'), skill.minRecoveryValue],
              [t('card:skill.maxRecovery'), skill.maxRecoveryValue],
              [t('card:skill.minSeconds'), skill.minSeconds],
              [t('card:skill.maxSeconds'), skill.maxSeconds],
              [t('card:skill.scoreUpRate'), `${skill.scoreUpRate}%`],
              [t('card:skill.comboSupportCount'), skill.comboSupportCount],
              [t('card:skill.perfectScoreUpRate'), skill.perfectScoreUpRate],
            ]}
          />
        </Table>
      </Modal>
      <div className="grid-2">
        <div className="col-span-1">
          <Card
            title={t('card:info')}
            bodyClassName="flex justify-center flex-col items-center"
          >
            <CardIcon
              id={card.masterID!}
              rarity={card.rarity!}
              attribute={card.attribute!}
              unit={unit.masterID!}
            />
            <div className="mt-2">{card.cardName}</div>
            <div className="text-gray-600">
              {character.fullNameEnglish || character.firstNameEnglish} -{' '}
              {unit.name}
            </div>
            <Table>
              <TableBody
                data={[
                  [t('card:id'), card.masterID],
                  [
                    t('card:skill_name'),
                    { name: card.skillName, onClick: () => setShowSkill(true) },
                  ],
                  [t('card:parameter.heart'), maxParameters?.heart],
                  [t('card:parameter.technique'), maxParameters?.technique],
                  [t('card:parameter.physical'), maxParameters?.physical],
                  [
                    t('card:parameter.total'),
                    (maxParameters?.physical || 0) +
                      (maxParameters?.technique || 0) +
                      (maxParameters?.heart || 0),
                  ],
                  [t('card:startdate'), formatTimeDetail(card.startDate)],
                  [t('card:enddate'), formatTimeDetail(card.endDate)],
                  card.rarity! > 2
                    ? [
                        t('nav:live2d'),
                        {
                          link: createLive2DShare([
                            {
                              name: card.cardName!,
                              model: `live2d_card_chara_${pad(
                                card.masterID!,
                                9
                              )}`,
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
            {card.rarity! > 2 && (
              <Disclosure
                title={t('card:illustrations.sd')}
                className="flex items-center justify-center flex-wrap"
              >
                {['00', '01', '02', '10', '11', '12'].map((item) => (
                  <div className="h-72 w-48 relative" key={item}>
                    <Image
                      urlType={GetURLType.CardSD}
                      parameter={[card.masterID, item]}
                      auto
                    />
                  </div>
                ))}
              </Disclosure>
            )}
            <Disclosure
              title={t('card:illustrations.transparent')}
              className="flex-center"
            >
              <Image
                urlType={GetURLType.CardTransparent}
                parameter={[card.masterID, 0]}
                width={920}
                height={770}
              />
            </Disclosure>
            {card.rarity! > 2 && (
              <Disclosure
                title={t('card:illustrations.transparent1')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CardTransparent}
                  parameter={[card.masterID, 1]}
                  width={920}
                  height={770}
                />
              </Disclosure>
            )}
            {card.rarity !== 7 && (
              <Disclosure
                title={t('card:illustrations.illustration')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CardIllust}
                  parameter={[card.masterID, 0]}
                  width={764}
                  height={508}
                />
              </Disclosure>
            )}
            {card.rarity! > 2 && (
              <Disclosure
                title={t('card:illustrations.illustration1')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CardIllust}
                  parameter={[card.masterID, 1]}
                  width={764}
                  height={508}
                />
              </Disclosure>
            )}
            <Disclosure
              title={t('card:illustrations.icon')}
              className="flex-center gap-x-1"
            >
              {card.rarity !== 7 && (
                <Image
                  urlType={GetURLType.CardIcon}
                  parameter={[card.masterID, 0]}
                  width={258}
                  height={258}
                />
              )}
              {card.rarity! > 2 && (
                <Image
                  urlType={GetURLType.CardIcon}
                  parameter={[card.masterID, 1]}
                  width={258}
                  height={258}
                />
              )}
            </Disclosure>
            <Disclosure
              title={t('card:illustrations.big_icon')}
              className="flex-center w-full gap-x-1"
            >
              {card.rarity !== 7 && (
                <Image
                  urlType={GetURLType.CardBigIcon}
                  parameter={[card.masterID, 0]}
                  width={344}
                  height={426}
                />
              )}
              {card.rarity! > 2 && (
                <Image
                  urlType={GetURLType.CardBigIcon}
                  parameter={[card.masterID, 1]}
                  width={344}
                  height={426}
                />
              )}
            </Disclosure>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  card: NonNullable<
    NonNullable<NonNullable<CardQuery['card']>['data']>['attributes']
  >
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const { data } = await client.query<CardQuery, CardQueryVariables>({
    query: CardDocument,
    variables: {
      cardId: id,
    },
  })

  if (!data.card?.data) {
    return { notFound: true }
  }

  return {
    props: {
      card: data.card.data.attributes!,
    },
  }
}

import { Card, Modal, Table, TableBody } from '@/components/Basic'
import { CardIcon } from '@/components/Image'
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
import { formatTimeDetail, pad } from 'utils'
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
            <></>
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

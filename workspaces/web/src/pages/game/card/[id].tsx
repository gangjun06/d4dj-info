import { Card, Disclosure, Modal, Table, TableBody } from '@/components/Basic'
import { CardIcon, Image } from '@/components/Elements/Image'
import prisma from '@/lib/prisma'
import {
  CardMaster,
  CharacterMaster,
  SkillMaster,
  UnitMaster,
} from '@prisma/client'
import MainLayout from 'layouts/main'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useTransition from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import { convertIDNum, formatTimeDetail, GetURLType, pad } from 'utils'
import { createLive2DShare } from 'utils/live2d'

export default function CardDetail({
  card,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTransition('')
  const [showSkill, setShowSkill] = useState<boolean>(false)

  const chara = card.character
  const skill = card.skillParameter

  const rarity = useMemo(() => convertIDNum(card.rarityId), [card.rarityId])

  return (
    <MainLayout
      breadCrumbs={[
        { name: t('nav:game.name'), link: '' },
        { name: t('nav:game.card'), link: '/game/card' },
        { name: t('nav:game.card_detail'), link: `` },
      ]}
      title={`${card.cardName} (${
        chara.fullNameEnglish || chara.firstNameEnglish
      })`}
    >
      <Modal show={showSkill} onClose={() => setShowSkill(false)} showCloseBtn>
        <Table>
          <TableBody
            data={[
              [t('card:skill.id'), skill.masterId],
              [t('card:skill_name'), card.skillName],
              [t('card:skill.minRecovery'), skill.minRecoveryValue],
              [t('card:skill.maxRecovery'), skill.maxRecoveryValue],
              [t('card:skill.minSeconds'), skill.minSeconds],
              [t('card:skill.maxSeconds'), skill.maxSeconds],
              [t('card:skill.scoreUpRate'), `${skill.scoreUpRate}%`],
              [t('card:skill.cmboSupportCount'), skill.comboSupportCount],
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
              id={convertIDNum(card.id)}
              rarity={rarity}
              attribute={convertIDNum(card.attributeId)}
              unit={convertIDNum(chara.unit.id)}
            />
            <div className="mt-1">{card.cardName}</div>
            <div className="text-gray-600 mb-1">
              {chara.fullNameEnglish || chara.firstNameEnglish} -{' '}
              {chara.unit.name}
            </div>
            <Table>
              <TableBody
                data={[
                  [t('common:id'), card.id],
                  [
                    t('card:skill_name'),
                    { name: card.skillName, onClick: () => setShowSkill(true) },
                  ],
                  [t('card:parameter.heart'), card.maxParameters[0]],
                  [t('card:parameter.technique'), card.maxParameters[1]],
                  [t('card:parameter.physical'), card.maxParameters[2]],
                  [
                    t('card:parameter.total'),
                    card.maxParameters[0] +
                      card.maxParameters[1] +
                      card.maxParameters[2],
                  ],
                  [t('card:startdate'), formatTimeDetail(card.startDate)],
                  [t('card:enddate'), formatTimeDetail(card.endDate)],
                  convertIDNum(card.rarityId) > 2
                    ? [
                        t('nav:live2d'),
                        {
                          link: createLive2DShare([
                            {
                              name: card.cardName!,
                              model: `live2d_card_chara_${pad(
                                card.masterId,
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
            {rarity! > 2 && (
              <Disclosure
                title={t('card:illustrations.sd')}
                className="flex items-center justify-center flex-wrap"
              >
                {['00', '01', '02', '10', '11', '12'].map((item) => (
                  <div className="h-72 w-48 relative" key={item}>
                    <Image
                      urlType={GetURLType.CardSD}
                      parameter={[card.masterId, item]}
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
                parameter={[card.masterId, 0]}
                width={920}
                height={770}
              />
            </Disclosure>
            {rarity > 2 && (
              <Disclosure
                title={t('card:illustrations.transparent1')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CardTransparent}
                  parameter={[card.masterId, 1]}
                  width={920}
                  height={770}
                />
              </Disclosure>
            )}
            {rarity !== 7 && (
              <Disclosure
                title={t('card:illustrations.illustration')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CardIllust}
                  parameter={[card.masterId, 0]}
                  width={764}
                  height={508}
                />
              </Disclosure>
            )}
            {rarity > 2 && (
              <Disclosure
                title={t('card:illustrations.illustration1')}
                className="flex-center"
              >
                <Image
                  urlType={GetURLType.CardIllust}
                  parameter={[card.masterId, 1]}
                  width={764}
                  height={508}
                />
              </Disclosure>
            )}
            <Disclosure
              title={t('card:illustrations.icon')}
              className="flex-center gap-x-1"
            >
              {rarity !== 7 && (
                <Image
                  urlType={GetURLType.CardIcon}
                  parameter={[card.masterId, 0]}
                  width={258}
                  height={258}
                />
              )}
              {rarity! > 2 && (
                <Image
                  urlType={GetURLType.CardIcon}
                  parameter={[card.masterId, 1]}
                  width={258}
                  height={258}
                />
              )}
            </Disclosure>
            <Disclosure
              title={t('card:illustrations.big_icon')}
              className="flex-center w-full gap-x-1"
            >
              {rarity !== 7 && (
                <Image
                  urlType={GetURLType.CardBigIcon}
                  parameter={[card.masterId, 0]}
                  width={344}
                  height={426}
                />
              )}
              {rarity! > 2 && (
                <Image
                  urlType={GetURLType.CardBigIcon}
                  parameter={[card.masterId, 1]}
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
  card: CardMaster & {
    character: CharacterMaster & {
      unit: UnitMaster
    }
    skillParameter: SkillMaster
  }
}> = async (context) => {
  const id = context.query.id
  if (typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  const data = await prisma.cardMaster.findUnique({
    where: {
      id,
    },
    include: {
      character: {
        include: {
          unit: true,
        },
      },
      skillParameter: true,
    },
  })

  if (!data) {
    return { notFound: true }
  }

  context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

  return {
    props: {
      card: data,
    },
  }
}

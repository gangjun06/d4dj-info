import { CardAttributeIcon, CardRarityIcon } from '@/components/Elements/Image'
import prisma from '@/lib/prisma'
import {
  Attribute,
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
  Rarity,
} from '@/types/index'
import type { CardMaster, CharacterMaster } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, convertListReq, unitField } from 'utils'

const card = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getCards(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const CardOptions: FindListOptionSet<AllCardsItem> = {
  url: '/api/card',
  fields: {
    rarity: {
      type: FindListType.Checkbox,
      label: 'card:rarity.name',
      name: 'rarity',
      options: [
        {
          component: CardRarityIcon({ rarity: Rarity.One }),
          value: Rarity.One.toString(),
        },
        {
          component: CardRarityIcon({ rarity: Rarity.Two }),
          value: Rarity.Two.toString(),
        },
        {
          component: CardRarityIcon({ rarity: Rarity.Three }),
          value: Rarity.Three.toString(),
        },
        {
          component: CardRarityIcon({ rarity: Rarity.Four }),
          value: Rarity.Four.toString(),
        },
        {
          component: CardRarityIcon({ rarity: Rarity.Special }),
          value: Rarity.Special.toString(),
        },
      ],
      customOptionHandler: (value: string | string[], region: string) => ({
        rarityId: {
          in: (value as string[]).map((d) => `${d}-${region}`),
        },
      }),
    },
    attribute: {
      type: FindListType.Checkbox,
      label: 'common:attribute.name',
      name: 'attribute',
      options: [
        {
          component: CardAttributeIcon({ attribute: Attribute.Street }),
          value: Attribute.Street.toString(),
        },
        {
          component: CardAttributeIcon({ attribute: Attribute.Party }),
          value: Attribute.Party.toString(),
        },
        {
          component: CardAttributeIcon({ attribute: Attribute.Cute }),
          value: Attribute.Cute.toString(),
        },
        {
          component: CardAttributeIcon({ attribute: Attribute.Cool }),
          value: Attribute.Cool.toString(),
        },
        {
          component: CardAttributeIcon({ attribute: Attribute.Elegant }),
          value: Attribute.Elegant.toString(),
        },
      ],
      customOptionHandler: (value: string | string[], region: string) => ({
        attributeId: {
          in: (value as string[]).map((d) => `${d}-${region}`),
        },
      }),
    },
    unit: unitField('character.unitId'),
    name: {
      type: FindListType.Input,
      label: 'common:name',
      name: 'name',
      placeholder: 'common:enter_name',
      customOptionHandler: (value: string | string[]) => ({
        cardName: {
          contains: value,
        },
      }),
    },
  },
  sort: {
    default: 'id',
    options: [
      { label: 'common:id', value: 'id' },
      { label: 'common:name', value: 'cardName' },
      { label: 'common:start_date', value: 'startDate' },
    ],
  },
}

export type AllCardsItem = CardMaster & {
  character: CharacterMaster & {
    unit: {
      id: string
      masterId: number
    }
  }
}

export async function getCards(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllCardsItem>>> {
  try {
    const { sortBy, where, pagination } = convertListReq(req, CardOptions)

    const data = await prisma?.cardMaster.findMany({
      ...pagination,
      ...where,
      ...sortBy,
      include: {
        character: {
          include: {
            unit: {
              select: {
                id: true,
                masterId: true,
              },
            },
          },
        },
      },
    })

    return res.json({ data })
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Bad Request') {
        return badRequest(res)
      }
    }

    return res.status(500).json({ msg: 'server error' })
  }
}

export default card

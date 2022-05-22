import { CardAttributeIcon, CardRarityIcon, UnitIcon } from '@/components/Image'
import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import type { CardMaster, CharacterMaster } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, convertListReq } from 'utils'

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
          component: CardRarityIcon({ rarity: 1 }),
          value: '1',
        },
        {
          component: CardRarityIcon({ rarity: 2 }),
          value: '2',
        },
        {
          component: CardRarityIcon({ rarity: 3 }),
          value: '3',
        },
        {
          component: CardRarityIcon({ rarity: 4 }),
          value: '4',
        },
        {
          component: CardRarityIcon({ rarity: 7 }),
          value: '7',
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
          component: CardAttributeIcon({ attribute: 1 }),
          value: '1',
        },
        {
          component: CardAttributeIcon({ attribute: 2 }),
          value: '2',
        },
        {
          component: CardAttributeIcon({ attribute: 3 }),
          value: '3',
        },
        {
          component: CardAttributeIcon({ attribute: 4 }),
          value: '4',
        },
        {
          component: CardAttributeIcon({ attribute: 5 }),
          value: '5',
        },
      ],
      customOptionHandler: (value: string | string[], region: string) => ({
        attributeId: {
          in: (value as string[]).map((d) => `${d}-${region}`),
        },
      }),
    },
    unit: {
      type: FindListType.Checkbox,
      label: 'common:unit.name',
      name: 'unit',
      options: [
        {
          component: UnitIcon({ unit: 1 }),
          value: '1',
        },
        {
          component: UnitIcon({ unit: 2 }),
          value: '2',
        },
        {
          component: UnitIcon({ unit: 3 }),
          value: '3',
        },
        {
          component: UnitIcon({ unit: 4 }),
          value: '4',
        },
        {
          component: UnitIcon({ unit: 5 }),
          value: '5',
        },
        {
          component: UnitIcon({ unit: 6 }),
          value: '6',
        },
        {
          component: UnitIcon({ unit: 7 }),
          value: '7',
        },
      ],
      customOptionHandler: (value: string[] | string, region: string) => ({
        character: {
          unitId: {
            in: (value as string[]).map((d) => `${d}-${region}`),
          },
        },
      }),
    },
    name: {
      type: FindListType.Input,
      label: 'name',
      name: 'name',
      placeholder: 'name',
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
      { label: 'id', value: 'id' },
      { label: 'name', value: 'cardName' },
    ],
    customOptionHandler: (value: string[], region: string) => ({
      character: {
        unitId: {
          in: value.map((d) => `${d}-${region}`),
        },
      },
    }),
  },
}

export type AllCardsItem = CardMaster & {
  character: CharacterMaster & {
    unit: {
      id: string
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

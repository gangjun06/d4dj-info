import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import type { CardMaster, CharacterMaster, Region } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const card = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getCards(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

const getPagination = (cursor: string | undefined, pageSize: number) => ({
  ...(cursor
    ? {
        cursor: { id: cursor },
      }
    : {}),
  take: pageSize,
  skip: 1,
})

export const CardOptions: FindListOptionSet<AllCardsItem> = {
  url: '/api/card',
  fields: {
    rarity: {
      type: FindListType.Checkbox,
      label: 'card:rarity.name',
      name: 'rarity',
      options: [
        {
          label: 'card:rarity.1',
          value: '1',
        },
        {
          label: 'card:rarity.2',
          value: '2',
        },
        { label: 'card:rarity.3', value: '3' },
        { label: 'card:rarity.4', value: '4' },
        {
          label: 'card:rarity.7',
          value: '7',
        },
      ],
      // customOptionHandler: (value: string[], region: string) => ({
      //   rarityId: {
      //     contains: value.map((d) => `${d}-${region}`),
      //   },
      // }),
    },
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
  const { cursor, region } = req.query
  if (Array.isArray(region) || Array.isArray(cursor))
    return res.status(400).json({ msg: 'Bad Request' })

  const data = await prisma?.cardMaster.findMany({
    ...getPagination(cursor, 30),
    where: {
      region: {
        equals: (region as Region) ?? 'jp',
      },
    },
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
}

export default card

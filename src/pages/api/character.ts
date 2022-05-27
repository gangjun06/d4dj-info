import prisma from '@/lib/prisma'
import { FindListOptionSet, FindListReturn, HttpMethod } from '@/types/index'
import type { CharacterMaster } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest } from 'utils'

const characters = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getCharacters(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const CharactersOptions: FindListOptionSet<AllCharactersItem> = {
  url: '/api/character',
  fields: {},
  sort: {
    default: 'id',
    options: [{ label: 'common:id', value: 'id' }],
  },
}

export type AllCharactersItem = CharacterMaster

export async function getCharacters(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllCharactersItem>>> {
  try {
    const data = await prisma?.characterMaster.findMany({
      where: {
        NOT: {
          firstNameEnglish: {
            startsWith: 'mob',
          },
        },
      },
      select: {
        id: true,
        firstNameEnglish: true,
        fullNameEnglish: true,
        fullName: true,
        masterId: true,
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

export default characters

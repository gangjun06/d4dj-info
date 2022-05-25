import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import { HonorMaster, HonorType } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { autoOptions, badRequest, convertListReq, nameSearch } from 'utils'

const honor = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return gethonors(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const honorOptions: FindListOptionSet<HonorMaster> = {
  url: '/api/honor',
  fields: {
    category: {
      type: FindListType.Checkbox,
      label: 'common:type',
      name: 'type',
      options: autoOptions('common:', HonorType),
    },
    effect: {
      type: FindListType.Checkbox,
      label: 'common:effect',
      name: 'effect',
      options: [
        {
          label: 'common:o',
          value: '0',
        },
        {
          label: 'common:x',
          value: '1',
        },
      ],
    },
    ...nameSearch(),
  },
  sort: {
    default: 'id',
    options: [{ label: 'common:id', value: 'id' }],
  },
}

export type AllHonorsItem = HonorMaster

export async function gethonors(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllHonorsItem>>> {
  try {
    const { sortBy, where, pagination, detail } = convertListReq(
      req,
      honorOptions
    )

    if (detail) {
      const data = await prisma.honorMaster.findUnique({
        where: { id: detail },
      })
      return res.json({ data: [data] })
    }

    const data = await prisma.honorMaster.findMany({
      ...pagination,
      ...where,
      ...sortBy,
      select: {
        id: true,
        name: true,
      },
    })

    return res.json({ data })
  } catch (e) {
    console.log(e)
    if (e instanceof Error) {
      if (e.message === 'Bad Request') {
        return badRequest(res)
      }
    }

    return res.status(500).json({ msg: 'server error' })
  }
}

export default honor

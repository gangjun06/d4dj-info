import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import { StampCategory, StampMaster } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { autoOptions, badRequest, convertListReq, nameSearch } from 'utils'

const stamp = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getStamps(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const StampOptions: FindListOptionSet<AllStampsItem> = {
  url: '/api/stamp',
  fields: {
    category: {
      type: FindListType.Checkbox,
      label: 'common:type',
      name: 'category',
      options: autoOptions('common:', StampCategory),
    },
    ...nameSearch,
  },
  sort: {
    default: 'id',
    options: [{ label: 'common:id', value: 'id' }],
  },
}

export type AllStampsItem = StampMaster

export async function getStamps(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllStampsItem>>> {
  try {
    const { sortBy, where, pagination, detail } = convertListReq(
      req,
      StampOptions
    )

    if (detail) {
      const data = await prisma.stampMaster.findUnique({
        where: { id: detail },
      })
      return res.json({ data: [data] })
    }

    const data = await prisma.stampMaster.findMany({
      ...pagination,
      ...where,
      ...sortBy,
      // include: {},
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

export default stamp

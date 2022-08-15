import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import { LiveSEMaster, LiveSEPackMaster, StockCategory } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { autoOptions, badRequest, convertListReq, nameSearch } from 'utils'

const livese = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getLiveSE(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const LiveSEOptions: FindListOptionSet<AllLiveSEItem> = {
  url: '/api/livese',
  fields: {
    category: {
      type: FindListType.Checkbox,
      label: 'common:category',
      name: 'category',
      options: autoOptions('common:stock.', StockCategory),
    },
    ...nameSearch(),
  },
  sort: {
    default: 'id',
    options: [{ label: 'common:id', value: 'id' }],
  },
}

export type AllLiveSEItem = LiveSEPackMaster & {
  livese?: LiveSEMaster
}

export async function getLiveSE(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllLiveSEItem>>> {
  try {
    const { sortBy, where, pagination, detail } = convertListReq(
      req,
      LiveSEOptions
    )

    if (detail) {
      const data = await prisma.liveSEPackMaster.findUnique({
        where: { id: detail },
      })
      return res.json({ data: [data] })
    }

    const data = await prisma.liveSEMaster.findMany({
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
    if (e instanceof Error) {
      if (e.message === 'Bad Request') {
        return badRequest(res)
      }
    }

    return res.status(500).json({ msg: 'server error' })
  }
}

export default livese

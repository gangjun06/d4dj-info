import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import {
  StockCategory,
  StockMaster,
  StockViewCategoryMaster,
} from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { autoOptions, badRequest, convertListReq, nameSearch } from 'utils'

const stock = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getStocks(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const StockOptions: FindListOptionSet<AllStocksItem> = {
  url: '/api/stock',
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

export type AllStocksItem = StockMaster & {
  viewCategory?: StockViewCategoryMaster
}

export async function getStocks(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllStocksItem>>> {
  try {
    const { sortBy, where, pagination, detail } = convertListReq(
      req,
      StockOptions
    )

    if (detail) {
      const data = await prisma.stockMaster.findUnique({
        where: { id: detail },
        include: {
          viewCategory: true,
        },
      })
      return res.json({ data: [data] })
    }

    const data = await prisma.stockMaster.findMany({
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

export default stock

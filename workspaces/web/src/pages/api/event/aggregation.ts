import prisma from '@/lib/prisma'
import { HttpMethod } from '@/types/index'
import { EventAggregationBaseMaster } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest } from 'utils'

const eventAggregation = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getAggregation(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export type GetAggregationResult = {
  data: EventAggregationBaseMaster
}

export async function getAggregation(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<GetAggregationResult>> {
  try {
    const { detail } = req.query
    if (!detail || Array.isArray(detail)) {
      new Error('Bad Request')
    }

    const data = await prisma.eventAggregationBaseMaster.findUnique({
      where: {
        id: detail as string,
      },
      include: {
        // eventPointRewards: true,
        // eventMedleySetlists: true,
        // eventRankingRewards: true,
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

export default eventAggregation

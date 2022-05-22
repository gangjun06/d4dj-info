import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import { EventMaster, EventType } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, convertListReq } from 'utils'

const event = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getEvents(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const EventOptions: FindListOptionSet<AllEventsItem> = {
  url: '/api/event',
  fields: {
    type: {
      type: FindListType.Checkbox,
      label: 'common:event.name',
      name: 'type',
      options: [
        {
          label: 'raid',
          value: EventType.Raid,
        },
        {
          label: 'Slot',
          value: EventType.Slot,
        },
        {
          label: 'poker',
          value: EventType.Poker,
        },
        {
          label: 'bingo',
          value: EventType.Medley,
        },
        {
          label: 'bingo',
          value: EventType.Bingo,
        },
      ],
      customOptionHandler: (value: string | string[], region: string) => ({
        type: {
          in: value,
        },
      }),
    },
    name: {
      type: FindListType.Input,
      label: 'name',
      name: 'name',
      placeholder: 'name',
      customOptionHandler: (value: string | string[]) => ({
        name: {
          contains: value,
        },
      }),
    },
  },
  sort: {
    default: 'id',
    options: [
      { label: 'id', value: 'id' },
      { label: 'name', value: 'name' },
    ],
  },
}

export type AllEventsItem = EventMaster

export async function getEvents(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllEventsItem>>> {
  try {
    const { sortBy, where, pagination } = convertListReq(req, EventOptions)

    const data = await prisma?.eventMaster.findMany({
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

export default event

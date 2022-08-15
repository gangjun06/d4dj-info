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
      label: 'common:type',
      name: 'type',
      options: [
        {
          label: 'common:event.raid',
          value: EventType.Raid,
        },
        {
          label: 'common:event.slot',
          value: EventType.Slot,
        },
        {
          label: 'common:event.poker',
          value: EventType.Poker,
        },
        {
          label: 'common:event.medley',
          value: EventType.Medley,
        },
        {
          label: 'common:event.bingo',
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
      label: 'common:name',
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
    default: 'startDate',
    defaultOrder: 'desc',
    options: [
      { label: 'common:id', value: 'id' },
      { label: 'common:name', value: 'name' },
      { label: 'common:start_date', value: 'startDate' },
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

import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import {
  ChartMaster,
  MusicCategory,
  MusicMaster,
  UnitMaster,
} from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, convertListReq, unitField } from 'utils'

const music = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getMusics(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const musicOptions: FindListOptionSet<AllMusicsItem> = {
  url: '/api/music',
  fields: {
    unit: unitField('unitId'),
    category: {
      type: FindListType.Checkbox,
      label: 'common:category',
      name: 'category',
      options: [
        {
          label: 'music:category.instrumental',
          value: MusicCategory.Instrumental,
        },
        {
          label: 'music:category.original',
          value: MusicCategory.Original,
        },
        {
          label: 'music:category.cover',
          value: MusicCategory.Cover,
        },
        {
          label: 'music:category.game',
          value: MusicCategory.Game,
        },
        {
          label: 'music:category.collabo',
          value: MusicCategory.Collabo,
        },
      ],
      customOptionHandler: (value: string | string[], region: string) => ({
        category: {
          in: (value as string[]).map((d) => `${d}`),
        },
      }),
    },
    name: {
      type: FindListType.Input,
      label: 'common:name',
      name: 'name',
      placeholder: 'common:enter_name',
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
      { label: 'common:id', value: 'id' },
      { label: 'common:name', value: 'name' },
      { label: 'common:default_order', value: 'defaultOrder' },
      { label: 'common:start_date', value: 'startDate' },
      { label: 'music:bpm', value: 'musicBpm' },
    ],
  },
}

export type AllMusicsItem = MusicMaster & {
  unit: UnitMaster
  charts: ChartMaster[]
}

export async function getMusics(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllMusicsItem>>> {
  try {
    const { sortBy, where, pagination } = convertListReq(req, musicOptions)

    const data = await prisma.musicMaster.findMany({
      ...pagination,
      ...where,
      ...sortBy,
      include: {
        unit: {
          select: {
            id: true,
            name: true,
          },
        },
        charts: {
          select: {
            id: true,
            level: true,
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

    console.error(e)

    return res.status(500).json({ msg: 'server error' })
  }
}

export default music

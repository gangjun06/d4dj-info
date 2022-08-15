import prisma from '@/lib/prisma'
import {
  FindListOptionSet,
  FindListReturn,
  FindListType,
  HttpMethod,
} from '@/types/index'
import { GachaCategory, GachaMaster, GachaType } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequest, convertListReq } from 'utils'

const gacha = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HttpMethod.GET:
      return getGachas(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).json({ msg: `Method ${req.method} Not Allowed` })
  }
}

export const GachaOptions: FindListOptionSet<AllGachasItem> = {
  url: '/api/gacha',
  fields: {
    category: {
      type: FindListType.Checkbox,
      label: 'common:category',
      name: 'category',
      options: [
        {
          label: 'gacha:categories.birthday',
          value: GachaCategory.Birthday,
        },
        {
          label: 'gacha:categories.event',
          value: GachaCategory.Event,
        },
        {
          label: 'gacha:categories.normal',
          value: GachaCategory.Normal,
        },
        {
          label: 'gacha:categories.revival',
          value: GachaCategory.Revival,
        },
        {
          label: 'gacha:categories.special',
          value: GachaCategory.Special,
        },
        {
          label: 'gacha:categories.tutorial',
          value: GachaCategory.Tutorial,
        },
      ],
      customOptionHandler: (value: string | string[], region: string) => ({
        cateogry: {
          in: value,
        },
      }),
    },
    type: {
      type: FindListType.Checkbox,
      label: 'common:type',
      name: 'type',
      options: [
        {
          label: 'gacha:types.audition',
          value: GachaType.Audition,
        },
        {
          label: 'gacha:types.normal',
          value: GachaType.Normal,
        },
        {
          label: 'gacha:types.stepUp',
          value: GachaType.StepUp,
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
      placeholder: 'common:enter_name',
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
      { label: 'common:startDate', value: 'startDate' },
    ],
  },
}

export type AllGachasItem = GachaMaster

export async function getGachas(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<FindListReturn<AllGachasItem>>> {
  try {
    const { sortBy, where, pagination } = convertListReq(req, GachaOptions)

    const data = await prisma?.gachaMaster.findMany({
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

export default gacha

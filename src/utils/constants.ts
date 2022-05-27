import { UnitIcon } from '@/components/Elements/Image'
import { FindListField, FindListType } from 'models'
import { strToObj } from 'utils'

export const unitField = (key: string): FindListField => ({
  type: FindListType.Checkbox,
  label: 'common:unit.name',
  name: 'unit',
  options: [
    {
      component: UnitIcon({ unit: 1 }),
      value: '1',
    },
    {
      component: UnitIcon({ unit: 2 }),
      value: '2',
    },
    {
      component: UnitIcon({ unit: 3 }),
      value: '3',
    },
    {
      component: UnitIcon({ unit: 4 }),
      value: '4',
    },
    {
      component: UnitIcon({ unit: 5 }),
      value: '5',
    },
    {
      component: UnitIcon({ unit: 6 }),
      value: '6',
    },
    {
      component: UnitIcon({ unit: 7 }),
      value: '7',
    },
  ],
  customOptionHandler: (value: string[] | string, region: string) =>
    strToObj(key, {
      in: (value as string[]).map((d) => `${d}-${region}`),
    }),
})

export const nameSearch = () => ({
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
})

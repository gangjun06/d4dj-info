export type ResultType = {
  name: string
  type: 'Master' | 'Enum'
  fields: Field[]
}

export type Field = {
  key: string
  value: string
  note?: string
  extra?: Extra[]
}

export type Extra = {
  name: string
  parameters?: {
    key?: string
    value: string | string[]
  }[]
}

export enum RelationType {
  OneToOne = 'OneToOne',
  OneToMany = 'OneToMany',
  ManyToOne = 'ManyToOne',
  ManyToMany = 'ManyToMany',
}
export type ModelSetting = {
  id?: string[]
  fields?: {
    [key: string]: {
      ref: string
      refField: string
      type: RelationType
    }
  }
}

export type ResultType = {
  name: string
  type: 'Master' | 'Enum'
  fields: Field[]
}

export type Field = {
  key: string
  value: string
  extra?: Extra[]
}

export type Extra = {
  name: string
  parameters?: {
    key?: string
    value: string | string[]
  }[]
}

export type relationType = 'OneToOne' | 'OneToMany' | 'ManyToOne' | 'ManyToMany'
export type ModelSetting = {
  id?: string[]
  fields?: {
    key: string | string[]
    ref: string
    refField: string
    type: relationType
  }[]
}

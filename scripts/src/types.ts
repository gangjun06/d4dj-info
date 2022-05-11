export type ResultType = {
  name: string
  type: 'Master' | 'Enum'
  extra: string[]
  fields: {
    key: string
    value: string
    extra?: string
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

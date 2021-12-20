export type PaginationInput = {
  skip?: number
  take?: number
  after?: number
}

export type OrderType = 'asc' | 'desc'

export type SortInput<T> = {
  name: T
  order: OrderType
}

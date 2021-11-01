export type PaginationInput = {
  skip?: number;
  take?: number;
  after?: number;
};

export type SortInput<T> = {
  name: T;
  order: "asc" | "desc";
};

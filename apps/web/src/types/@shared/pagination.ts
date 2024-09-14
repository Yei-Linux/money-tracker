export type Pagination<T> = {
  filters: T;
  skip: number;
  limit: number;
};

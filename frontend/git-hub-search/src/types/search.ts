export type SearchResponseT<T> = {
  data: T[],
  nextCursor: string | null,
  totalCount: number,
}
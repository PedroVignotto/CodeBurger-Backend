export interface ListCategoriesRepository {
  list: () => Promise<ListCategoriesRepository.Output>
}

export namespace ListCategoriesRepository {
  export type Output = Array<{ id: string, name: string }>
}

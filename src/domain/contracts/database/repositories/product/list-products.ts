export interface ListProductsRepository {
  list: (input: ListProductsRepository.Input) => Promise<ListProductsRepository.Output>
}

export namespace ListProductsRepository {
  export type Input = { categoryId?: string }
  export type Output = Array<{
    id: string
    categoryId?: string
    name: string
    description: string
    price: number
    available: boolean
    picture?: string
  }>
}

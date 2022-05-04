export interface LoadProductsRepository {
  loadAll: (input: LoadProductsRepository.Input) => Promise<LoadProductsRepository.Output>
}

export namespace LoadProductsRepository {
  export type Input = { productsId: string[] }
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

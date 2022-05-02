export interface LoadProductRepository {
  load: (input: LoadProductRepository.Input) => Promise<LoadProductRepository.Output>
}

export namespace LoadProductRepository {
  export type Input = { id: string }
  export type Output = {
    id: string
    categoryId?: string
    name: string
    description: string
    price: number
    available: boolean
    picture?: string
  } | undefined
}

export interface UpdateProductRepository {
  update: (input: UpdateProductRepository.Input) => Promise<UpdateProductRepository.Output>
}

export namespace UpdateProductRepository {
  export type Input = {
    id: string
    categoryId?: string
    name?: string
    description?: string
    price?: number
    available?: boolean
    picture?: string
  }
  export type Output = void
}

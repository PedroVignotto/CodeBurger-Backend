export interface DeleteProductRepository {
  delete: (input: DeleteProductRepository.Input) => Promise<DeleteProductRepository.Output>
}

export namespace DeleteProductRepository {
  export type Input = { id: string }
  export type Output = void
}

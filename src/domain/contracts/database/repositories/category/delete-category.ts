export interface DeleteCategoryRepository {
  delete: (input: DeleteCategoryRepository.Input) => Promise<DeleteCategoryRepository.Output>
}

export namespace DeleteCategoryRepository {
  export type Input = { id: string }
  export type Output = void
}

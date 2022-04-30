export interface AddCategoryRepository {
  create: (input: AddCategoryRepository.Input) => Promise<AddCategoryRepository.Output>
}

export namespace AddCategoryRepository {
  export type Input = { name: string }
  export type Output = { id: string, name: string }
}

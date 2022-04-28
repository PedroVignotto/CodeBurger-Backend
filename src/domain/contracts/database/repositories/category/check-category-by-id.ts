export interface CheckCategoryByIdRepository {
  checkById: (input: CheckCategoryByIdRepository.Input) => Promise<CheckCategoryByIdRepository.Output>
}

export namespace CheckCategoryByIdRepository {
  export type Input = { id: string }
  export type Output = boolean
}

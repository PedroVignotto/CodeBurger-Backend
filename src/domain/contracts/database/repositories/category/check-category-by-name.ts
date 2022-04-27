export interface CheckCategoryByNameRepository {
  checkByName: (input: CheckCategoryByNameRepository.Input) => Promise<CheckCategoryByNameRepository.Output>
}

export namespace CheckCategoryByNameRepository {
  export type Input = { name: string }
  export type Output = boolean
}

export interface CheckProductByNameRepository {
  checkByName: (input: CheckProductByNameRepository.Input) => Promise<CheckProductByNameRepository.Output>
}

export namespace CheckProductByNameRepository {
  export type Input = { name: string }
  export type Output = boolean
}

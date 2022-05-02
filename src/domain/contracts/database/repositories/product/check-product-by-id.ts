export interface CheckProductByIdRepository {
  checkById: (input: CheckProductByIdRepository.Input) => Promise<CheckProductByIdRepository.Output>
}

export namespace CheckProductByIdRepository {
  export type Input = { id: string }
  export type Output = boolean
}

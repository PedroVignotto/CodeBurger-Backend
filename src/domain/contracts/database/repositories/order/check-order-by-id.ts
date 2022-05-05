export interface CheckOrderByIdRepository {
  checkById: (input: CheckOrderByIdRepository.Input) => Promise<CheckOrderByIdRepository.Output>
}

export namespace CheckOrderByIdRepository {
  export type Input = { id: string }
  export type Output = boolean
}

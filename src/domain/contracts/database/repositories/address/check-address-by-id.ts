export interface CheckAddressByIdRepository {
  checkById: (input: CheckAddressByIdRepository.Input) => Promise<CheckAddressByIdRepository.Output>
}

export namespace CheckAddressByIdRepository {
  export type Input = { id: string }
  export type Output = boolean
}

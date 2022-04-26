export interface DeleteAddressRepository {
  delete: (input: DeleteAddressRepository.Input) => Promise<DeleteAddressRepository.Output>
}

export namespace DeleteAddressRepository {
  export type Input = { id: string }
  export type Output = void
}

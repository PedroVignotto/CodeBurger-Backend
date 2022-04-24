export interface AddAddressRepository {
  create: (input: AddAddressRepository.Input) => Promise<AddAddressRepository.Output>
}

export namespace AddAddressRepository {
  export type Input = { surname: string, zipCode: string, district: string, address: string, number: number }
  export type Output = boolean
}

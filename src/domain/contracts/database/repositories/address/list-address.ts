export interface ListAddressRepository {
  list: (input: ListAddressRepository.Input) => Promise<ListAddressRepository.Output>
}

export namespace ListAddressRepository {
  export type Input = { accountId: string }
  export type Output = {
    id: string
    surname: string
    zipCode: string
    district: string
    address: string
    number: number
    complement?: string
  }
}

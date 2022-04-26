export interface ListAddressesRepository {
  list: (input: ListAddressesRepository.Input) => Promise<ListAddressesRepository.Output>
}

export namespace ListAddressesRepository {
  export type Input = { accountId: string }
  export type Output = Array<{
    id: string
    surname: string
    zipCode: string
    district: string
    street: string
    number: number
    complement?: string
  }>
}

export interface AddAddressRepository {
  create: (input: AddAddressRepository.Input) => Promise<AddAddressRepository.Output>
}

export namespace AddAddressRepository {
  export type Input = {
    accountId: string
    surname: string
    zipCode: string
    district: string
    street: string
    number: number
    complement?: string
    active: boolean
  }
  export type Output ={
    id: string
    surname: string
    zipCode: string
    district: string
    street: string
    number: number
    complement?: string
    active: boolean
  }
}

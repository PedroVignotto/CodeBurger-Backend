import { AddAddressRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode, addressRepository: AddAddressRepository) => AddAddress
type Input = { accountId: string, surname: string, zipCode: string, district: string, address: string, number: number, complement?: string }
type Output = undefined
export type AddAddress = (input: Input) => Promise<Output>

export const AddAddressUseCase: Setup = (searchAddressByZipCode, addressRepository) => async input => {
  const account = await searchAddressByZipCode.search({ zipCode: input.zipCode })

  if (!account) return undefined

  await addressRepository.create(input)

  return undefined
}

import { SearchAddressByZipCode } from '@/domain/contracts/gateways'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode) => AddAddress
type Input = { zipCode: string }
type Output = undefined
export type AddAddress = (input: Input) => Promise<Output>

export const AddAddressUseCase: Setup = (searchAddressByZipCode) => async input => {
  await searchAddressByZipCode.search({ zipCode: input.zipCode })

  return undefined
}

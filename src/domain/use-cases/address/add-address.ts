import { AddAddressRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { FieldNotFoundError } from '@/domain/errors'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode, addressRepository: AddAddressRepository) => AddAddress
type Input = { accountId: string, surname: string, zipCode: string, district: string, street: string, number: number, complement?: string }
type Output = undefined | Error
export type AddAddress = (input: Input) => Promise<Output>

export const addAddressUseCase: Setup = (searchAddressByZipCode, addressRepository) => async ({ zipCode, ...input }) => {
  const address = await searchAddressByZipCode.search({ zipCode })

  if (!address) return new FieldNotFoundError('zipCode')

  await addressRepository.create({ zipCode: zipCode.replace('-', ''), ...input })
}

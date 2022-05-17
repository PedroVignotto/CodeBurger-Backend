import { AddAddressRepository, ListAddressesRepository } from '@/domain/contracts/database/repositories/address'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { FieldNotFoundError } from '@/domain/errors'

type Setup = (searchAddressByZipCode: SearchAddressByZipCode, addressRepository: AddAddressRepository & ListAddressesRepository) => AddAddress
type Input = { accountId: string, surname: string, zipCode: string, district: string, street: string, number: number, complement?: string }
type Output = { id: string, surname: string, zipCode: string, district: string, street: string, number: number, complement?: string }
export type AddAddress = (input: Input) => Promise<Output>

export const addAddressUseCase: Setup = (searchAddressByZipCode, addressRepository) => async ({ zipCode, accountId, ...input }) => {
  const address = await searchAddressByZipCode.search({ zipCode })

  if (!address) throw new FieldNotFoundError('zipCode')

  await addressRepository.list({ accountId })

  return await addressRepository.create({ accountId, zipCode: zipCode.replace('-', ''), ...input })
}

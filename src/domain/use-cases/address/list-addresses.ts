import { ListAddressesRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: ListAddressesRepository) => ListAddresses
type Input = { accountId: string }
type Output = Array<{ id: string, surname: string, zipCode: string, district: string, address: string, number: number, complement?: string }>
export type ListAddresses = (input: Input) => Promise<Output>

export const ListAddressesUseCase: Setup = addressRepository => async ({ accountId }) => {
  const addresses = await addressRepository.list({ accountId })

  return addresses
}

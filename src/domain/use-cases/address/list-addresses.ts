import { ListAddressRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: ListAddressRepository) => ListAddress
type Input = { accountId: string }
type Output = { id: string, surname: string, zipCode: string, district: string, address: string, number: number, complement?: string }
export type ListAddress = (input: Input) => Promise<Output>

export const ListAddressUseCase: Setup = addressRepository => async ({ accountId }) => {
  const addresses = await addressRepository.list({ accountId })

  return addresses
}

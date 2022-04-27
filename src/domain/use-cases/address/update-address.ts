import { CheckAddressByIdRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: CheckAddressByIdRepository & UpdateAddressRepository) => UpdateAddress
type Input = { id: string, surname?: string, number?: number, complement?: string }
type Output = boolean
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = addressRepository => async ({ id, surname, number, complement }) => {
  const address = await addressRepository.checkById({ id })

  if (!address) return false

  await addressRepository.update({ id, surname, number, complement })

  return true
}

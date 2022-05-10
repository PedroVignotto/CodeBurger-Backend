import { CheckAddressByIdRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (addressRepository: CheckAddressByIdRepository & UpdateAddressRepository) => UpdateAddress
type Input = { id: string, surname?: string, number?: number, complement?: string }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = addressRepository => async ({ id, surname, number, complement }) => {
  const address = await addressRepository.checkById({ id })

  if (!address) throw new NonExistentFieldError('id')

  await addressRepository.update({ id, surname, number, complement })
}

import { CheckAddressByIdRepository, ListAddressesRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (addressRepository: CheckAddressByIdRepository & UpdateAddressRepository & ListAddressesRepository) => UpdateAddress
type Input = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: string }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = addressRepository => async ({ accountId, id, surname, number, complement }) => {
  const address = await addressRepository.checkById({ id })

  if (!address) throw new NonExistentFieldError('id')

  await addressRepository.list({ accountId })

  await addressRepository.update({ id, surname, number, complement })
}

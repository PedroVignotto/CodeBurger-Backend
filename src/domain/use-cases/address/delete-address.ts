import { CheckAddressByIdRepository, DeleteAddressRepository } from '@/domain/contracts/database/repositories/address'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (addressRepository: CheckAddressByIdRepository & DeleteAddressRepository) => DeleteAddress
type Input = { id: string }
type Output = undefined | Error
export type DeleteAddress = (input: Input) => Promise<Output>

export const deleteAddressUseCase: Setup = addressRepository => async ({ id }) => {
  const address = await addressRepository.checkById({ id })

  if (!address) return new NonExistentFieldError('id')

  await addressRepository.delete({ id })
}

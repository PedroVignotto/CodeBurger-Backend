import { CheckAddressByIdRepository, DeleteAddressRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: CheckAddressByIdRepository & DeleteAddressRepository) => DeleteAddress
type Input = { id: string }
type Output = boolean
export type DeleteAddress = (input: Input) => Promise<Output>

export const deleteAddressUseCase: Setup = addressRepository => async ({ id }) => {
  const address = await addressRepository.checkById({ id })

  if (!address) return false

  await addressRepository.delete({ id })

  return true
}

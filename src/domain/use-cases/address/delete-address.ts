import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: CheckAddressByIdRepository) => DeleteAddress
type Input = { id: string }
type Output = boolean
export type DeleteAddress = (input: Input) => Promise<Output>

export const deleteAddressUseCase: Setup = addressRepository => async ({ id }) => {
  await addressRepository.checkById({ id })

  return false
}

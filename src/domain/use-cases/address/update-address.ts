import { CheckAddressByIdRepository } from '@/domain/contracts/database/repositories/address'

type Setup = (addressRepository: CheckAddressByIdRepository) => UpdateAddress
type Input = { id: string, surname?: string, number?: number, complement?: string }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

export const updateAddressUseCase: Setup = addressRepository => async ({ id }) => {
  await addressRepository.checkById({ id })
}

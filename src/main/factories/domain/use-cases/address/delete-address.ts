import { DeleteAddress, deleteAddressUseCase } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeDeleteAddressUseCase = (): DeleteAddress => {
  return deleteAddressUseCase(makeAddressRepository())
}

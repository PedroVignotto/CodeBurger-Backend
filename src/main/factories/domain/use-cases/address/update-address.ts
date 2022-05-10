import { UpdateAddress, updateAddressUseCase } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeUpdateAddressUseCase = (): UpdateAddress =>
  updateAddressUseCase(makeAddressRepository())

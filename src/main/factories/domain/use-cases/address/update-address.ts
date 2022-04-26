import { UpdateAddress } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeUpdateAddressUseCase = (): UpdateAddress => {
  return makeAddressRepository().update.bind(makeAddressRepository())
}

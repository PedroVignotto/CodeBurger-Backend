import { ListAddresses, ListAddressesUseCase } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeListAddressesUseCase = (): ListAddresses => {
  return ListAddressesUseCase(makeAddressRepository())
}

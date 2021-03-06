import { ListAddresses } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeListAddressesUseCase = (): ListAddresses =>
  makeAddressRepository().list.bind(makeAddressRepository())

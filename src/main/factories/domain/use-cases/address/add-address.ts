import { makeSearchAddressByZipCode } from '@/main/factories/infra/gateways'
import { AddAddress, AddAddressUseCase } from '@/domain/use-cases/address'
import { makeAddressRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeAddAddressUseCase = (): AddAddress => {
  return AddAddressUseCase(makeSearchAddressByZipCode(), makeAddressRepository())
}

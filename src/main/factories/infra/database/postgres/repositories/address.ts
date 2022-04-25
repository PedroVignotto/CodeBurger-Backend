import { makeUUIDAdapter } from '@/main/factories/infra/gateways'
import { AddressRepository } from '@/infra/database/postgres/repositories'

export const makeAddressRepository = (): AddressRepository => {
  return new AddressRepository(makeUUIDAdapter())
}

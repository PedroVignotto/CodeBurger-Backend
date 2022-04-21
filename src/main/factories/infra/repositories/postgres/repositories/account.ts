import { makeUUIDAdapter } from '@/main/factories/infra/gateways'
import { AccountRepository } from '@/infra/repositories/postgres/repositories'

export const makeAccountRepository = (): AccountRepository => {
  return new AccountRepository(makeUUIDAdapter())
}

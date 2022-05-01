import { makeUUIDAdapter } from '@/main/factories/infra/gateways'
import { ProductRepository } from '@/infra/database/postgres/repositories'

export const makeProductRepository = (): ProductRepository => {
  return new ProductRepository(makeUUIDAdapter())
}

import { makeUUIDAdapter } from '@/main/factories/infra/gateways'
import { CategoryRepository } from '@/infra/database/postgres/repositories'

export const makeCategoryRepository = (): CategoryRepository =>
  new CategoryRepository(makeUUIDAdapter())

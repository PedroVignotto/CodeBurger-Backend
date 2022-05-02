import { makeCategoryRepository, makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { makeFileStorage, makeUUIDAdapter } from '@/main/factories/infra/gateways'

export const makeUpdateProductUseCase = (): UpdateProduct => {
  return updateProductUseCase(makeProductRepository(), makeCategoryRepository(), makeFileStorage(), makeUUIDAdapter())
}

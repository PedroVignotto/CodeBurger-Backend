import { makeCategoryRepository, makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'
import { makeFileStorage, makeUUIDAdapter } from '@/main/factories/infra/gateways'

export const makeAddProductUseCase = (): AddProduct => {
  return addProductUseCase(makeProductRepository(), makeCategoryRepository(), makeUUIDAdapter(), makeFileStorage())
}

import { ListProducts } from '@/domain/use-cases/product'
import { makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeListProductsUseCase = (): ListProducts =>
  makeProductRepository().list.bind(makeProductRepository())

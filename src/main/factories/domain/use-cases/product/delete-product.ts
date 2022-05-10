import { makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'
import { makeFileStorage } from '@/main/factories/infra/gateways'

export const makeDeleteProductUseCase = (): DeleteProduct =>
  deleteProductUseCase(makeProductRepository(), makeFileStorage())

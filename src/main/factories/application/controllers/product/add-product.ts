import { makeAddProductUseCase } from '@/main/factories/domain/use-cases/product'
import { AddProductController } from '@/application/controllers/product'

export const makeAddProductController = (): AddProductController =>
  new AddProductController(makeAddProductUseCase())

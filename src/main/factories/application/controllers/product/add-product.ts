import { makeAddProductUseCase } from '@/main/factories/domain/use-cases/product'
import { AddProductController } from '@/application/controllers/product'

export const makeAddProductController = (): AddProductController => {
  return new AddProductController(makeAddProductUseCase())
}

import { makeListProductsUseCase } from '@/main/factories/domain/use-cases/product'
import { ListProductsController } from '@/application/controllers/product'

export const makeListProductsController = (): ListProductsController => {
  return new ListProductsController(makeListProductsUseCase())
}

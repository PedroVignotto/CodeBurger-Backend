import { makeUpdateProductUseCase } from '@/main/factories/domain/use-cases/product'
import { UpdateProductController } from '@/application/controllers/product'

export const makeUpdateProductController = (): UpdateProductController => {
  return new UpdateProductController(makeUpdateProductUseCase())
}

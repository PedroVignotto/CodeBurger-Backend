import { makeDeleteProductUseCase } from '@/main/factories/domain/use-cases/product'
import { DeleteProductController } from '@/application/controllers/product'

export const makeDeleteProductController = (): DeleteProductController => {
  return new DeleteProductController(makeDeleteProductUseCase())
}

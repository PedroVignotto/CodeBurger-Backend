import { makeAddOrderUseCase } from '@/main/factories/domain/use-cases/order'
import { AddOrderController } from '@/application/controllers/order'

export const makeAddOrderController = (): AddOrderController =>
  new AddOrderController(makeAddOrderUseCase())

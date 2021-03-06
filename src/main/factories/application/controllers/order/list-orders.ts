import { makeListOrdersUseCase } from '@/main/factories/domain/use-cases/order'
import { ListOrdersController } from '@/application/controllers/order'

export const makeListOrdersController = (): ListOrdersController =>
  new ListOrdersController(makeListOrdersUseCase())

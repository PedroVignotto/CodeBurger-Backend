import { makeOrderRepository } from '@/main/factories/infra/database/postgres/repositories'
import { UpdateOrder, updateOrderUseCase } from '@/domain/use-cases/order'

export const makeUpdateOrderUseCase = (): UpdateOrder =>
  updateOrderUseCase(makeOrderRepository())

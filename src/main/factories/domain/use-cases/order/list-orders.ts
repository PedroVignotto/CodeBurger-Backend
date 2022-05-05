import { ListOrders } from '@/domain/use-cases/order'
import { makeOrderRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeListOrdersUseCase = (): ListOrders => {
  return makeOrderRepository().list.bind(makeOrderRepository())
}

import { makeOrderRepository, makeProductRepository } from '@/main/factories/infra/database/postgres/repositories'
import { AddOrder, addOrderUseCase } from '@/domain/use-cases/order'

export const makeAddOrderUseCase = (): AddOrder =>
  addOrderUseCase(makeProductRepository(), makeOrderRepository())

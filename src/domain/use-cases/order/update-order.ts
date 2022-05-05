import { CheckOrderByIdRepository, UpdateOrderRepository } from '@/domain/contracts/database/repositories/order'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (orderRepository: CheckOrderByIdRepository & UpdateOrderRepository) => UpdateOrder
type Input = { id: string, status: string }
type Output = undefined | Error
export type UpdateOrder = (input: Input) => Promise<Output>

export const updateOrderUseCase: Setup = orderRepository => async ({ id, status }) => {
  const order = await orderRepository.checkById({ id })

  if (!order) return new NonExistentFieldError('id')

  await orderRepository.update({ id, status })
}

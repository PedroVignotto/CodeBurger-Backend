import { CheckOrderByIdRepository, UpdateOrderRepository } from '@/domain/contracts/database/repositories/order'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (orderRepository: CheckOrderByIdRepository & UpdateOrderRepository) => UpdateOrder
type Input = { id: string, status: string }
type Output = void
export type UpdateOrder = (input: Input) => Promise<Output>

export const updateOrderUseCase: Setup = orderRepository => async ({ id, status }) => {
  const order = await orderRepository.checkById({ id })

  if (!order) throw new NonExistentFieldError('id')

  await orderRepository.update({ id, status })
}

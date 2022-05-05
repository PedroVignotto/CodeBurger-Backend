import { CheckOrderByIdRepository } from '@/domain/contracts/database/repositories/order'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (orderRepository: CheckOrderByIdRepository) => UpdateOrder
type Input = { id: string }
type Output = Error
export type UpdateOrder = (input: Input) => Promise<Output>

export const updateOrderUseCase: Setup = orderRepository => async ({ id }) => {
  await orderRepository.checkById({ id })

  return new NonExistentFieldError('id')
}

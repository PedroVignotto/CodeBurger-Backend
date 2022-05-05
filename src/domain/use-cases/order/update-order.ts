import { CheckOrderByIdRepository } from '@/domain/contracts/database/repositories/order'

type Setup = (orderRepository: CheckOrderByIdRepository) => UpdateOrder
type Input = { id: string }
type Output = void
export type UpdateOrder = (input: Input) => Promise<Output>

export const updateOrderUseCase: Setup = orderRepository => async ({ id }) => {
  await orderRepository.checkById({ id })
}

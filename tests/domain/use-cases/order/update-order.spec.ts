import { orderParams } from '@/tests/mocks'
import { CheckOrderByIdRepository } from '@/domain/contracts/database/repositories/order'
import { UpdateOrder, updateOrderUseCase } from '@/domain/use-cases/order/update-order'

import { mock } from 'jest-mock-extended'

describe('UpdateOrderUseCase', () => {
  let sut: UpdateOrder

  const { id } = orderParams

  const orderRepository = mock<CheckOrderByIdRepository>()

  beforeEach(() => {
    sut = updateOrderUseCase(orderRepository)
  })

  it('Should call CheckOrderByIdRepository with correct id', async () => {
    await sut({ id })

    expect(orderRepository.checkById).toHaveBeenCalledWith({ id })
    expect(orderRepository.checkById).toHaveBeenCalledTimes(1)
  })
})

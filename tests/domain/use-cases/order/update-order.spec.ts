import { orderParams } from '@/tests/mocks'
import { CheckOrderByIdRepository, UpdateOrderRepository } from '@/domain/contracts/database/repositories/order'
import { UpdateOrder, updateOrderUseCase } from '@/domain/use-cases/order/update-order'

import { mock } from 'jest-mock-extended'
import { NonExistentFieldError } from '@/domain/errors'

describe('UpdateOrderUseCase', () => {
  let sut: UpdateOrder

  const { id, error, status } = orderParams

  const orderRepository = mock<CheckOrderByIdRepository & UpdateOrderRepository>()

  beforeAll(() => {
    orderRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = updateOrderUseCase(orderRepository)
  })

  it('Should call CheckOrderByIdRepository with correct id', async () => {
    await sut({ id, status })

    expect(orderRepository.checkById).toHaveBeenCalledWith({ id })
    expect(orderRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckOrderByIdRepository return false', async () => {
    orderRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id, status })

    expect(result).toEqual(new NonExistentFieldError('id'))
  })

  it('Should rethrow if CheckOrderByIdRepository throws', async () => {
    orderRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id, status })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call UpdateOrderRepository with correct values', async () => {
    await sut({ id, status })

    expect(orderRepository.update).toHaveBeenCalledWith({ id, status })
    expect(orderRepository.update).toHaveBeenCalledTimes(1)
  })
})

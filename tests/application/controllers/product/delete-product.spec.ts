import { productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteProductController } from '@/application/controllers/product'

describe('DeleteProductController', () => {
  let sut: DeleteProductController

  const { id } = productParams

  const deleteProduct: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new DeleteProductController(deleteProduct)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call deleteProduct with correct id', async () => {
    await sut.handle({ id })

    expect(deleteProduct).toHaveBeenCalledWith({ id })
    expect(deleteProduct).toHaveBeenCalledTimes(1)
  })
})

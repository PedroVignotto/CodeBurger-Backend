import { productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteProductController } from '@/application/controllers/product'
import { NonExistentFieldError } from '@/domain/errors'

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

  it('Should return badRequest if deleteProduct return NonExistentFieldError', async () => {
    deleteProduct.mockResolvedValueOnce(new NonExistentFieldError('id'))

    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('id'))
  })

  it('Should return noContent if deleteProduct return undefined', async () => {
    const { statusCode } = await sut.handle({ id })

    expect(statusCode).toBe(204)
  })
})

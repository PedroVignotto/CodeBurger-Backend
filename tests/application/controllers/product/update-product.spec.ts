import { categoryParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation } from '@/application/validation'
import { UpdateProductController } from '@/application/controllers/product'
import { NonExistentFieldError } from '@/domain/errors'

describe('UpdateProductController', () => {
  let sut: UpdateProductController

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, file } = productParams

  const updateProduct: jest.Mock = jest.fn()

  beforeAll(() => {
    updateProduct.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new UpdateProductController(updateProduct)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ id, file })

    expect(validators).toEqual([
      new AllowedMimeTypesValidation(['png', 'jpg'], file.mimeType),
      new MaxFileSizeValidation(5, file.buffer)
    ])
  })

  it('Should call updateProduct with correct values', async () => {
    await sut.handle({ id, categoryId, name, description, price, available, file })

    expect(updateProduct).toHaveBeenCalledWith({ id, categoryId, name, description, price, available, file })
    expect(updateProduct).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if updateProduct return Error', async () => {
    updateProduct.mockResolvedValueOnce(new NonExistentFieldError('id'))

    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('id'))
  })

  it('Should return noContent if valid data is provided', async () => {
    const { statusCode } = await sut.handle({ id, categoryId, name, description, price, available, file })

    expect(statusCode).toBe(204)
  })
})

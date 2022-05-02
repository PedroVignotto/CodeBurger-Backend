import { categoryParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'
import { UpdateProductController } from '@/application/controllers/product'

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
      new RequiredValidation(id, 'id'),
      new AllowedMimeTypesValidation(['png', 'jpg'], file.mimeType),
      new MaxFileSizeValidation(5, file.buffer)
    ])
  })

  it('Should call updateProduct with correct values', async () => {
    await sut.handle({ id, categoryId, name, description, price, available, file })

    expect(updateProduct).toHaveBeenCalledWith({ id, categoryId, name, description, price, available, file })
    expect(updateProduct).toHaveBeenCalledTimes(1)
  })
})

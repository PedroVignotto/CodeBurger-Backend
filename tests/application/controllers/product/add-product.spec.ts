import { categoryParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'
import { AddProductController } from '@/application/controllers/product'
import { FieldInUseError } from '@/domain/errors'

describe('AddProductController', () => {
  let sut: AddProductController

  const { id: categoryId } = categoryParams
  const { id, name, description, price, available, picture, file } = productParams

  const addProduct: jest.Mock = jest.fn()

  beforeAll(() => {
    addProduct.mockResolvedValue({ id, categoryId, name, description, price, available, picture })
  })

  beforeEach(() => {
    sut = new AddProductController(addProduct)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ categoryId, name, description, price, file })

    expect(validators).toEqual([
      new RequiredValidation(categoryId, 'categoryId'),
      new RequiredValidation(name, 'name'),
      new RequiredValidation(description, 'description'),
      new RequiredValidation(price, 'price'),
      new AllowedMimeTypesValidation(['png', 'jpg'], file.mimeType),
      new MaxFileSizeValidation(5, file.buffer)
    ])
  })

  it('Should call addProduct with correct values', async () => {
    await sut.handle({ categoryId, name, description, price, file })

    expect(addProduct).toHaveBeenCalledWith({ categoryId, name, description, price, file })
    expect(addProduct).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if addProduct return Error', async () => {
    addProduct.mockRejectedValueOnce(new FieldInUseError('name'))

    const { statusCode, data } = await sut.handle({ categoryId, name, description, price, file })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('name'))
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ categoryId, name, description, price, file })

    expect(statusCode).toBe(201)
    expect(data).toEqual({ id, categoryId, name, description, price, available, picture })
  })
})

import { categoryParams, productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'
import { AddProductController } from '@/application/controllers/product'

describe('AddProductController', () => {
  let sut: AddProductController

  const { id: categoryId } = categoryParams
  const { name, description, price, file } = productParams

  beforeEach(() => {
    sut = new AddProductController()
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
})
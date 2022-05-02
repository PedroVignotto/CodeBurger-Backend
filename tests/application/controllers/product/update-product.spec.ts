import { productParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { AllowedMimeTypesValidation, MaxFileSizeValidation, RequiredValidation } from '@/application/validation'
import { UpdateProductController } from '@/application/controllers/product'

describe('UpdateProductController', () => {
  let sut: UpdateProductController

  const { id, file } = productParams

  beforeEach(() => {
    sut = new UpdateProductController()
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
})

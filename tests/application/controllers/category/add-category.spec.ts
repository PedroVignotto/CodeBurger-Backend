import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'
import { AddCategoryController } from '@/application/controllers/category'

describe('AddCategoryController', () => {
  let sut: AddCategoryController

  const { name } = categoryParams

  const addCategory: jest.Mock = jest.fn()

  beforeEach(() => {
    sut = new AddCategoryController(addCategory)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name })

    expect(validators).toEqual([new RequiredValidation(name, 'name')])
  })

  it('Should call addCategory with correct values', async () => {
    await sut.handle({ name })

    expect(addCategory).toHaveBeenCalledWith({ name })
    expect(addCategory).toHaveBeenCalledTimes(1)
  })
})

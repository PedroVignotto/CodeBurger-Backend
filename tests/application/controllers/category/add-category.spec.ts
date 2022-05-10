import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { RequiredValidation } from '@/application/validation'
import { AddCategoryController } from '@/application/controllers/category'
import { FieldInUseError } from '@/domain/errors'

describe('AddCategoryController', () => {
  let sut: AddCategoryController

  const { id, name } = categoryParams

  const addCategory: jest.Mock = jest.fn()

  beforeAll(() => {
    addCategory.mockResolvedValue({ id, name })
  })

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

  it('Should return badRequest if addCategory return FieldInUseError', async () => {
    addCategory.mockRejectedValueOnce(new FieldInUseError('name'))

    const { statusCode, data } = await sut.handle({ name })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new FieldInUseError('name'))
  })

  it('Should return created if valid data is provided', async () => {
    const { statusCode, data } = await sut.handle({ name })

    expect(statusCode).toBe(201)
    expect(data).toEqual({ id, name })
  })
})

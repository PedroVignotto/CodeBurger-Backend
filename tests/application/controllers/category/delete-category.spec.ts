import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteCategoryController } from '@/application/controllers/category'
import { NonExistentFieldError } from '@/domain/errors'

describe('DeleteCategoryController', () => {
  let sut: DeleteCategoryController

  const { id } = categoryParams

  const deleteCategory: jest.Mock = jest.fn()

  beforeAll(() => {
    deleteCategory.mockResolvedValue(undefined)
  })

  beforeEach(() => {
    sut = new DeleteCategoryController(deleteCategory)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call deleteCategory with correct values', async () => {
    await sut.handle({ id })

    expect(deleteCategory).toHaveBeenCalledWith({ id })
    expect(deleteCategory).toHaveBeenCalledTimes(1)
  })

  it('Should return badRequest if deleteCategory return NonExistentFieldError', async () => {
    deleteCategory.mockResolvedValueOnce(new NonExistentFieldError('id'))

    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new NonExistentFieldError('id'))
  })

  it('Should return ok if deleteCategory return undefined', async () => {
    const { statusCode } = await sut.handle({ id })

    expect(statusCode).toBe(200)
  })
})

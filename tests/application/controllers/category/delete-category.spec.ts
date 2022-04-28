import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteCategoryController } from '@/application/controllers/category'
import { InvalidFieldError } from '@/application/errors'

describe('DeleteCategoryController', () => {
  let sut: DeleteCategoryController

  const { id } = categoryParams

  const deleteCategory: jest.Mock = jest.fn()

  beforeAll(() => {
    deleteCategory.mockResolvedValue(true)
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

  it('Should return badRequest if deleteCategory return false', async () => {
    deleteCategory.mockResolvedValueOnce(false)

    const { statusCode, data } = await sut.handle({ id })

    expect(statusCode).toBe(400)
    expect(data).toEqual(new InvalidFieldError('id'))
  })

  it('Should return ok if deleteCategory return true', async () => {
    const { statusCode } = await sut.handle({ id })

    expect(statusCode).toBe(200)
  })
})

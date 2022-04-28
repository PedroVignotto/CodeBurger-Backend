import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { DeleteCategoryController } from '@/application/controllers/category'

describe('DeleteCategoryController', () => {
  let sut: DeleteCategoryController

  const { id } = categoryParams

  const deleteCategory: jest.Mock = jest.fn()

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
})

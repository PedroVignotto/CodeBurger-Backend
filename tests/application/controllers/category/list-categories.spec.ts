import { categoryParams } from '@/tests/mocks'
import { Controller } from '@/application/controllers'
import { ListCategoriesController } from '@/application/controllers/category'

describe('ListCategoriesController', () => {
  let sut: ListCategoriesController

  const { id, name } = categoryParams

  const listCategories: jest.Mock = jest.fn()

  beforeAll(() => {
    listCategories.mockResolvedValue([{ id, name }])
  })

  beforeEach(() => {
    sut = new ListCategoriesController(listCategories)
  })

  it('Should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should call listCategories with correct values', async () => {
    await sut.handle()

    expect(listCategories).toHaveBeenCalledWith()
    expect(listCategories).toHaveBeenCalledTimes(1)
  })

  it('Should return ok with all categories', async () => {
    const { statusCode, data } = await sut.handle()

    expect(statusCode).toBe(200)
    expect(data).toEqual([{ id, name }])
  })
})

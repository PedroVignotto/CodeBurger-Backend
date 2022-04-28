import { Controller } from '@/application/controllers'
import { ListCategoriesController } from '@/application/controllers/category'

describe('ListCategoriesController', () => {
  let sut: ListCategoriesController

  const listCategories: jest.Mock = jest.fn()

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
})

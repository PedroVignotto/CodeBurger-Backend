import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'

import { mock } from 'jest-mock-extended'

describe('AddCategoryUseCase', () => {
  let sut: AddCategory

  const { name } = categoryParams

  const categoryRepository = mock<CheckCategoryByNameRepository>()

  beforeEach(() => {
    sut = addCategoryUseCase(categoryRepository)
  })

  it('Should call CheckCategoryByNameRepository with correct name', async () => {
    await sut({ name })

    expect(categoryRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(categoryRepository.checkByName).toHaveBeenCalledTimes(1)
  })
})

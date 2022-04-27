import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'

import { mock } from 'jest-mock-extended'

describe('AddCategoryUseCase', () => {
  let sut: AddCategory

  const { name, error } = categoryParams

  const categoryRepository = mock<CheckCategoryByNameRepository>()

  beforeEach(() => {
    sut = addCategoryUseCase(categoryRepository)
  })

  it('Should call CheckCategoryByNameRepository with correct name', async () => {
    await sut({ name })

    expect(categoryRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(categoryRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should return false if CheckCategoryByNameRepository return true', async () => {
    categoryRepository.checkByName.mockResolvedValueOnce(true)

    const result = await sut({ name })

    expect(result).toBe(false)
  })

  it('Should rethrow if CheckCategoryByNameRepository throws', async () => {
    categoryRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(error)
  })
})

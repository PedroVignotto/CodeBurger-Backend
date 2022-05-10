import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByIdRepository, DeleteCategoryRepository } from '@/domain/contracts/database/repositories/category'
import { DeleteCategory, deleteCategoryUseCase } from '@/domain/use-cases/category'
import { NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeleteCategoryUseCase', () => {
  let sut: DeleteCategory

  const { id, error } = categoryParams

  const categoryRepository = mock<CheckCategoryByIdRepository & DeleteCategoryRepository>()

  beforeAll(() => {
    categoryRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = deleteCategoryUseCase(categoryRepository)
  })

  it('Should call CheckCategoryByIdRepository with correct id', async () => {
    await sut({ id })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should throw NonExistentFieldError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new NonExistentFieldError('id'))
  })

  it('Should rethrow if CheckCategoryByIdRepository throws', async () => {
    categoryRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call DeleteCategoryRepository with correct id', async () => {
    await sut({ id })

    expect(categoryRepository.delete).toHaveBeenCalledWith({ id })
    expect(categoryRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if DeleteCategoryRepository throws', async () => {
    categoryRepository.delete.mockRejectedValueOnce(error)

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return undefined on success', async () => {
    const result = await sut({ id })

    expect(result).toBeUndefined()
  })
})

import { categoryParams } from '@/tests/mocks'
import { CheckCategoryByIdRepository, DeleteCategoryRepository } from '@/domain/contracts/database/repositories/category'
import { DeleteCategory, deleteCategoryUseCase } from '@/domain/use-cases/category'

import { mock } from 'jest-mock-extended'

describe('DeleteCategoryUseCase', () => {
  let sut: DeleteCategory

  const { id } = categoryParams

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

  it('Should return false if CheckAddressByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ id })

    expect(result).toBe(false)
  })

  it('Should call DeleteCategoryRepository with correct id', async () => {
    await sut({ id })

    expect(categoryRepository.delete).toHaveBeenCalledWith({ id })
    expect(categoryRepository.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return true on success', async () => {
    const result = await sut({ id })

    expect(result).toBe(true)
  })
})

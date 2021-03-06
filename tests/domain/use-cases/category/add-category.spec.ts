import { categoryParams } from '@/tests/mocks'
import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'
import { AddCategory, addCategoryUseCase } from '@/domain/use-cases/category'
import { FieldInUseError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddCategoryUseCase', () => {
  let sut: AddCategory

  const { id, name, error } = categoryParams

  const categoryRepository = mock<CheckCategoryByNameRepository & AddCategoryRepository>()

  beforeAll(() => {
    categoryRepository.checkByName.mockResolvedValue(false)
    categoryRepository.create.mockResolvedValue({ id, name })
  })

  beforeEach(() => {
    sut = addCategoryUseCase(categoryRepository)
  })

  it('Should call CheckCategoryByNameRepository with correct name', async () => {
    await sut({ name })

    expect(categoryRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(categoryRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should return FieldInUseError if CheckCategoryByNameRepository return true', async () => {
    categoryRepository.checkByName.mockResolvedValueOnce(true)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('Should rethrow if CheckCategoryByNameRepository throws', async () => {
    categoryRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should call AddCategoryRepository with correct name', async () => {
    await sut({ name })

    expect(categoryRepository.create).toHaveBeenCalledWith({ name })
    expect(categoryRepository.create).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if AddCategoryRepository throws', async () => {
    categoryRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return category on success', async () => {
    const result = await sut({ name })

    expect(result).toEqual({ id, name })
  })
})

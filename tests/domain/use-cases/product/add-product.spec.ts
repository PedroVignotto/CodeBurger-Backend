import { categoryParams, productParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AddProductUseCase', () => {
  let sut: AddProduct

  const { id: categoryId } = categoryParams
  const { name } = productParams

  const productRepository = mock<CheckProductByNameRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()

  beforeEach(() => {
    sut = addProductUseCase(productRepository, categoryRepository)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ categoryId, name })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should return FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const result = await sut({ categoryId, name })

    expect(result).toEqual(new FieldInUseError('name'))
  })

  it('Should call CheckCategoryByIdRepository with correct id', async () => {
    await sut({ categoryId, name })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: categoryId })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ categoryId, name })

    expect(result).toEqual(new NonExistentFieldError('categoryId'))
  })
})

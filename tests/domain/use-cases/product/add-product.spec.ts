import { categoryParams, productParams } from '@/tests/mocks'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { FieldInUseError, NonExistentFieldError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'
import { UUIDGenerator } from '@/domain/contracts/gateways'

describe('AddProductUseCase', () => {
  let sut: AddProduct

  const { id: categoryId } = categoryParams
  const { name, file } = productParams

  const productRepository = mock<CheckProductByNameRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const uuid = mock<UUIDGenerator>()

  beforeAll(() => {
    productRepository.checkByName.mockResolvedValue(false)
    categoryRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = addProductUseCase(productRepository, categoryRepository, uuid)
  })

  it('Should call CheckProductByNameRepository with correct name', async () => {
    await sut({ categoryId, name, file })

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should return FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const result = await sut({ categoryId, name, file })

    expect(result).toEqual(new FieldInUseError('name'))
  })

  it('Should call CheckCategoryByIdRepository with correct id', async () => {
    await sut({ categoryId, name, file })

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: categoryId })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should return NonExistentFieldError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const result = await sut({ categoryId, name, file })

    expect(result).toEqual(new NonExistentFieldError('categoryId'))
  })

  it('Should call UUIDGenerator if file is provided', async () => {
    await sut({ categoryId, name, file })

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('Should not call UUIDGenerator if file is not provided', async () => {
    await sut({ categoryId, name })

    expect(uuid.generate).not.toHaveBeenCalled()
  })
})

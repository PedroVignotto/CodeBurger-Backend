import { Category } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddCategoryRepository, CheckCategoryByIdRepository, CheckCategoryByNameRepository, DeleteCategoryRepository, ListCategoriesRepository } from '@/domain/contracts/database/repositories/category'

export class CategoryRepository extends PgRepository implements CheckCategoryByNameRepository, AddCategoryRepository, ListCategoriesRepository, CheckCategoryByIdRepository, DeleteCategoryRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const repository = this.getRepository(Category)

    return !!await repository.findOne({ name })
  }

  async create ({ name }: AddCategoryRepository.Input): Promise<AddCategoryRepository.Output> {
    const repository = this.getRepository(Category)

    return await repository.save({ id: this.uuid.generate(), name })
  }

  async list (): Promise<ListCategoriesRepository.Output> {
    const repository = this.getRepository(Category)

    return await repository.find()
  }

  async checkById ({ id }: CheckCategoryByIdRepository.Input): Promise<CheckCategoryByIdRepository.Output> {
    const repository = this.getRepository(Category)

    return !!await repository.findOne({ id })
  }

  async delete ({ id }: DeleteCategoryRepository.Input): Promise<DeleteCategoryRepository.Output> {
    const repository = this.getRepository(Category)

    await repository.delete({ id })
  }
}

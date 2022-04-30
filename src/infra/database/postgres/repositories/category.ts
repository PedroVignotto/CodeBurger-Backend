import { Category } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddCategoryRepository, CheckCategoryByIdRepository, CheckCategoryByNameRepository, DeleteCategoryRepository, ListCategoriesRepository } from '@/domain/contracts/database/repositories/category'

export class CategoryRepository extends PgRepository implements CheckCategoryByNameRepository, AddCategoryRepository, ListCategoriesRepository, CheckCategoryByIdRepository, DeleteCategoryRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const repository = this.getRepository(Category)

    const categoryExists = await repository.findOne({ name })

    return !!categoryExists
  }

  async create ({ name }: AddCategoryRepository.Input): Promise<AddCategoryRepository.Output> {
    const repository = this.getRepository(Category)

    const category = await repository.save({ id: this.uuid.generate(), name })

    return category
  }

  async list (): Promise<ListCategoriesRepository.Output> {
    const repository = this.getRepository(Category)

    const categories = await repository.find()

    return categories
  }

  async checkById ({ id }: CheckCategoryByIdRepository.Input): Promise<CheckCategoryByIdRepository.Output> {
    const repository = this.getRepository(Category)

    const categoryExists = await repository.findOne({ id })

    return !!categoryExists
  }

  async delete ({ id }: DeleteCategoryRepository.Input): Promise<DeleteCategoryRepository.Output> {
    const repository = this.getRepository(Category)

    await repository.delete({ id })
  }
}

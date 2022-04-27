import { Category } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddCategoryRepository, CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'

export class CategoryRepository extends PgRepository implements CheckCategoryByNameRepository, AddCategoryRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const repository = this.getRepository(Category)

    const categoryExists = await repository.findOne({ name })

    return !!categoryExists
  }

  async create ({ name }: AddCategoryRepository.Input): Promise<AddCategoryRepository.Output> {
    const repository = this.getRepository(Category)

    await repository.save({ id: this.uuid.generate(), name })
  }
}

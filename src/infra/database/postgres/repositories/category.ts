import { Category } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { CheckCategoryByNameRepository } from '@/domain/contracts/database/repositories/category'

export class CategoryRepository extends PgRepository implements CheckCategoryByNameRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByName ({ name }: CheckCategoryByNameRepository.Input): Promise<CheckCategoryByNameRepository.Output> {
    const repository = this.getRepository(Category)

    const categoryExists = await repository.findOne({ name })

    return !!categoryExists
  }
}

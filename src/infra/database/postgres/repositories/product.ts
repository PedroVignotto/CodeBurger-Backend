import { Product } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { CheckProductByNameRepository } from '@/domain/contracts/database/repositories/product'

export class ProductRepository extends PgRepository implements CheckProductByNameRepository {
  async checkByName ({ name }: CheckProductByNameRepository.Input): Promise<CheckProductByNameRepository.Output> {
    const repository = this.getRepository(Product)

    return !!await repository.findOne({ name })
  }
}

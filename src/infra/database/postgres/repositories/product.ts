import { Product } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddProductRepository, CheckProductByNameRepository, ListProductsRepository } from '@/domain/contracts/database/repositories/product'

export class ProductRepository extends PgRepository implements CheckProductByNameRepository, AddProductRepository, ListProductsRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async checkByName ({ name }: CheckProductByNameRepository.Input): Promise<CheckProductByNameRepository.Output> {
    const repository = this.getRepository(Product)

    return !!await repository.findOne({ name })
  }

  async create ({ categoryId, name, description, price, picture }: AddProductRepository.Input): Promise<AddProductRepository.Output> {
    const repository = this.getRepository(Product)

    return await repository.save({ id: this.uuid.generate(), categoryId, name, description, price, picture })
  }

  async list ({ categoryId }: ListProductsRepository.Input): Promise<ListProductsRepository.Output> {
    const repository = this.getRepository(Product)

    return await repository.find(categoryId ? { where: { categoryId } } : undefined)
  }
}

import { Product } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddProductRepository, CheckProductByIdRepository, CheckProductByNameRepository, DeleteProductRepository, ListProductsRepository, LoadProductRepository, UpdateProductRepository } from '@/domain/contracts/database/repositories/product'

type Setup = CheckProductByNameRepository & AddProductRepository & ListProductsRepository & CheckProductByIdRepository & LoadProductRepository & UpdateProductRepository & DeleteProductRepository

export class ProductRepository extends PgRepository implements Setup {
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

  async checkById ({ id }: CheckProductByIdRepository.Input): Promise<CheckProductByIdRepository.Output> {
    const repository = this.getRepository(Product)

    return !!await repository.findOne(id)
  }

  async load ({ id }: LoadProductRepository.Input): Promise<LoadProductRepository.Output> {
    const repository = this.getRepository(Product)

    return await repository.findOne(id)
  }

  async update ({ id, ...input }: UpdateProductRepository.Input): Promise<UpdateProductRepository.Output> {
    const repository = this.getRepository(Product)

    await repository
      .createQueryBuilder()
      .update(JSON.parse(JSON.stringify(input)))
      .where({ id })
      .execute()
  }

  async delete ({ id }: DeleteProductRepository.Input): Promise<DeleteProductRepository.Output> {
    const repository = this.getRepository(Product)

    await repository.delete({ id })
  }
}

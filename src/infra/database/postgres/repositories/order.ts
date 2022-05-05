import { Order } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddOrderRepository, ListOrdersRepository } from '@/domain/contracts/database/repositories/order'

type Setup = AddOrderRepository & ListOrdersRepository

export class OrderRepository extends PgRepository implements Setup {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async create ({ accountId, products, note, total, paymentMode }: AddOrderRepository.Input): Promise<AddOrderRepository.Output> {
    const repository = this.getRepository(Order)

    await repository.save({ id: this.uuid.generate(), accountId, products, paymentMode, total, note })
  }

  async list ({ accountId }: ListOrdersRepository.Input): Promise<ListOrdersRepository.Output> {
    const repository = this.getRepository(Order)

    return await repository.find({ where: { accountId }, relations: ['products'] })
  }
}

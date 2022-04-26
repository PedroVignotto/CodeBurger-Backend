import { Address } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddAddressRepository, ListAddressRepository } from '@/domain/contracts/database/repositories/address'

export class AddressRepository extends PgRepository implements AddAddressRepository, ListAddressRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async create (input: AddAddressRepository.Input): Promise<AddAddressRepository.Output> {
    const repository = this.getRepository(Address)

    await repository.save({ id: this.uuid.generate(), ...input })

    return true
  }

  async list ({ accountId }: ListAddressRepository.Input): Promise<ListAddressRepository.Output> {
    const repository = this.getRepository(Address)

    const addresses = await repository.find({ accountId })

    return addresses
  }
}

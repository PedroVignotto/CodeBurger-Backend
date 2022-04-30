import { Address } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddAddressRepository, CheckAddressByIdRepository, DeleteAddressRepository, ListAddressesRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'

export class AddressRepository extends PgRepository implements AddAddressRepository, ListAddressesRepository, UpdateAddressRepository, CheckAddressByIdRepository, DeleteAddressRepository {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async create (input: AddAddressRepository.Input): Promise<AddAddressRepository.Output> {
    const repository = this.getRepository(Address)

    const address = await repository.save({ id: this.uuid.generate(), ...input })

    return address
  }

  async list ({ accountId }: ListAddressesRepository.Input): Promise<ListAddressesRepository.Output> {
    const repository = this.getRepository(Address)

    const addresses = await repository.find({ accountId })

    return addresses
  }

  async update ({ id, ...input }: UpdateAddressRepository.Input): Promise<UpdateAddressRepository.Output> {
    const repository = this.getRepository(Address)

    await repository
      .createQueryBuilder()
      .update(JSON.parse(JSON.stringify(input)))
      .where({ id })
      .execute()
  }

  async checkById ({ id }: CheckAddressByIdRepository.Input): Promise<CheckAddressByIdRepository.Output> {
    const repository = this.getRepository(Address)

    const addressExists = await repository.findOne(id)

    return !!addressExists
  }

  async delete ({ id }: DeleteAddressRepository.Input): Promise<DeleteAddressRepository.Output> {
    const repository = this.getRepository(Address)

    await repository.delete({ id })
  }
}

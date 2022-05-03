import { Address } from '@/infra/database/postgres/entities'
import { PgRepository } from '@/infra/database/postgres/repositories'
import { UUIDGenerator } from '@/domain/contracts/gateways'
import { AddAddressRepository, CheckAddressByIdRepository, DeleteAddressRepository, ListAddressesRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'

type Setup = AddAddressRepository & ListAddressesRepository & UpdateAddressRepository & CheckAddressByIdRepository & DeleteAddressRepository

export class AddressRepository extends PgRepository implements Setup {
  constructor (private readonly uuid: UUIDGenerator) { super() }

  async create (input: AddAddressRepository.Input): Promise<AddAddressRepository.Output> {
    const repository = this.getRepository(Address)

    return await repository.save({ id: this.uuid.generate(), ...input })
  }

  async list ({ accountId }: ListAddressesRepository.Input): Promise<ListAddressesRepository.Output> {
    const repository = this.getRepository(Address)

    return await repository.find({ accountId })
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

    return !!await repository.findOne(id)
  }

  async delete ({ id }: DeleteAddressRepository.Input): Promise<DeleteAddressRepository.Output> {
    const repository = this.getRepository(Address)

    await repository.delete({ id })
  }
}

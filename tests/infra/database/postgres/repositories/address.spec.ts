import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { AddressRepository, PgRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Account, Address } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { mock } from 'jest-mock-extended'
import faker from 'faker'
import { Repository } from 'typeorm'

describe('AddressRepository', () => {
  let sut: AddressRepository

  let id: string
  let name: string
  let email: string
  let password: string

  let surname: string
  let zipCode: string
  let district: string
  let address: string
  let number: number
  let complement: string

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repository: Repository<Account>

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Address])
    backup = database.backup()
    repository = connection.getRepository(Account)
  })

  beforeEach(() => {
    backup.restore()

    sut = new AddressRepository(uuid)

    id = faker.datatype.uuid()
    name = faker.name.findName()
    email = faker.internet.email()
    password = faker.internet.password(8)

    surname = faker.random.word()
    zipCode = faker.address.zipCode('########')
    district = faker.random.words(2)
    address = faker.address.streetName()
    number = faker.datatype.number()
    complement = faker.random.words(3)

    uuid.generate.mockReturnValue(id)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  it('Should return true on success', async () => {
    const account = await repository.save({ id, name, email, password })

    const result = await sut.create({ accountId: account.id, surname, zipCode, district, address, number, complement })

    expect(result).toBe(true)
  })
})

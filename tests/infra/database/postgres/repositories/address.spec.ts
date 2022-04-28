import { accountParams, addressParams } from '@/tests/mocks'
import { makeFakeDatabase } from '@/tests/infra/database/postgres/mocks'
import { AddressRepository, PgRepository } from '@/infra/database/postgres/repositories'
import { PgConnection } from '@/infra/database/postgres/helpers'
import { Account, Address } from '@/infra/database/postgres/entities'
import { UUIDGenerator } from '@/domain/contracts/gateways'

import { IBackup, IMemoryDb } from 'pg-mem'
import { mock } from 'jest-mock-extended'
import { Repository } from 'typeorm'

describe('AddressRepository', () => {
  let sut: AddressRepository

  const { id, name, email, password } = accountParams
  const { surname, zipCode, district, street, number, complement } = addressParams

  let connection: PgConnection
  let database: IMemoryDb
  let backup: IBackup
  let repositoryAccount: Repository<Account>
  let repositoryAddress: Repository<Address>

  const uuid = mock<UUIDGenerator>()

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    database = await makeFakeDatabase([Account, Address])
    backup = database.backup()
    repositoryAccount = connection.getRepository(Account)
    repositoryAddress = connection.getRepository(Address)

    uuid.generate.mockReturnValue(id)
  })

  beforeEach(() => {
    backup.restore()

    sut = new AddressRepository(uuid)
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('create()', () => {
    it('Should create a address on success', async () => {
      const account = await repositoryAccount.save({ id, name, email, password })

      await sut.create({ accountId: account.id, surname, zipCode, district, street, number, complement })

      expect(await repositoryAccount.findOne(id)).toBeTruthy()
    })
  })

  describe('list()', () => {
    it('Should return all user addresses', async () => {
      const { id: accountId } = await repositoryAccount.save({ id, name, email, password })
      const { id: addressId } = await repositoryAddress.save({ id, accountId, surname, zipCode, district, street, number, complement })

      const addresses = await sut.list({ accountId })

      expect(addresses).toEqual([{ id: addressId, surname, zipCode, district, street, number, complement }])
    })

    it('Should return [] if does not find any address', async () => {
      const addresses = await sut.list({ accountId: id })

      expect(addresses).toEqual([])
    })
  })

  describe('update()', () => {
    it('Should update address on success', async () => {
      const account = await repositoryAccount.save({ id, name, email, password })
      const address = await repositoryAddress.save({ id, accountId: account.id, surname, zipCode, district, street, number, complement })

      await sut.update({ id: address.id, surname: 'updated_surname' })

      expect(await repositoryAddress.findOne(address.id)).toMatchObject({ surname: 'updated_surname' })
    })
  })

  describe('checkById()', () => {
    it('Should return false if address does not exists', async () => {
      const addressExists = await sut.checkById({ id })

      expect(addressExists).toBe(false)
    })

    it('Should return true if address already exists', async () => {
      const account = await repositoryAccount.save({ id, name, email, password })
      const address = await repositoryAddress.save({ id, accountId: account.id, surname, zipCode, district, street, number, complement })

      const addressExists = await sut.checkById({ id: address.id })

      expect(addressExists).toBe(true)
    })
  })

  describe('delete()', () => {
    it('Should delete a address on success', async () => {
      const account = await repositoryAccount.save({ id, name, email, password })
      const address = await repositoryAddress.save({ id, accountId: account.id, surname, zipCode, district, street, number, complement })

      await sut.delete({ id: address.id })

      expect(await repositoryAddress.findOne(address.id)).toBeUndefined()
    })
  })
})

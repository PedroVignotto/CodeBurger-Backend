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

  const { id: accountId, name, email, password } = accountParams
  const { id, surname, zipCode, district, street, number, complement, active } = addressParams

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
      await repositoryAccount.save({ id: accountId, name, email, password })

      await sut.create({ accountId, surname, zipCode, district, street, number, complement, active })

      expect(await repositoryAddress.findOne(id)).toBeTruthy()
    })
  })

  describe('list()', () => {
    it('Should return all user addresses', async () => {
      await repositoryAccount.save({ id: accountId, name, email, password })
      await repositoryAddress.save({ id, accountId, surname, zipCode, district, street, number, complement, active })

      const result = await sut.list({ accountId })

      expect(result).toEqual([{ id, surname, zipCode, district, street, number, complement, active }])
    })

    it('Should return [] if does not find any address', async () => {
      const result = await sut.list({ accountId })

      expect(result).toEqual([])
    })
  })

  describe('update()', () => {
    it('Should update address on success', async () => {
      await repositoryAccount.save({ id: accountId, name, email, password })
      await repositoryAddress.save({ id, accountId, surname, zipCode, district, street, number, complement, active })

      await sut.update({ id, surname: 'updated_surname' })

      expect(await repositoryAddress.findOne(id)).toMatchObject({ surname: 'updated_surname' })
    })
  })

  describe('checkById()', () => {
    it('Should return false if address does not exists', async () => {
      const result = await sut.checkById({ id })

      expect(result).toBe(false)
    })

    it('Should return true if address already exists', async () => {
      await repositoryAccount.save({ id: accountId, name, email, password })
      await repositoryAddress.save({ id, accountId, surname, zipCode, district, street, number, complement, active })

      const result = await sut.checkById({ id })

      expect(result).toBe(true)
    })
  })

  describe('delete()', () => {
    it('Should delete a address on success', async () => {
      await repositoryAccount.save({ id: accountId, name, email, password })
      await repositoryAddress.save({ id, accountId, surname, zipCode, district, street, number, complement, active })

      await sut.delete({ id })

      expect(await repositoryAddress.findOne(id)).toBeUndefined()
    })
  })
})

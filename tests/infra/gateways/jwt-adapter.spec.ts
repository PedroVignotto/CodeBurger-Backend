import { JwtAdapter } from '@/infra/gateways'

import jwt from 'jsonwebtoken'
import faker from 'faker'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter

  let secret: string

  let token: string
  let error: Error

  const fakeJwt = jwt as jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = faker.datatype.uuid()
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)

    token = faker.datatype.uuid()
    error = new Error(faker.random.word())
  })

  describe('generate()', () => {
    let key: string

    beforeAll(() => {
      secret = faker.datatype.uuid()
    })

    beforeEach(() => {
      key = faker.random.word()

      fakeJwt.sign.mockImplementation(() => token)
    })

    it('Should call sign with correct values', async () => {
      await sut.generate({ key })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: '1d' })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if sign throw', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw error })

      const promise = sut.generate({ key })

      await expect(promise).rejects.toThrow(error)
    })

    it('Should return a accessToken on success', async () => {
      const accessToken = await sut.generate({ key })

      expect(accessToken).toBe(token)
    })
  })

  describe('validate()', () => {
    let accountId: string

    beforeEach(() => {
      accountId = faker.datatype.uuid()

      fakeJwt.verify.mockImplementation(() => ({ key: accountId }))
    })

    it('Should call verify with correct values', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if verify throw', async () => {
      fakeJwt.verify.mockImplementationOnce(() => { throw error })

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow(error)
    })

    it('Should return a accountId on success', async () => {
      const result = await sut.validate({ token })

      expect(result).toBe(accountId)
    })
  })
})

import { BCryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcryptjs'
import faker from 'faker'

jest.mock('bcryptjs')

describe('BcryptAdapter', () => {
  let sut: BCryptAdapter
  let plaintext: string
  let digest: string
  let error: Error
  let fakeBcrypt: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    plaintext = faker.random.word()
    digest = faker.datatype.uuid()
    error = new Error(faker.random.word())

    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
  })

  beforeEach(() => {
    sut = new BCryptAdapter()
  })

  describe('generate()', () => {
    const salt = 12

    beforeAll(() => {
      fakeBcrypt.hash.mockImplementation(() => digest)
    })

    it('Should call hash with correct values', async () => {
      await sut.generate({ plaintext })

      expect(fakeBcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
      expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
    })

    it('Should rethrow if hash throw', async () => {
      fakeBcrypt.hash.mockImplementationOnce(() => { throw error })

      const promise = sut.generate({ plaintext })

      await expect(promise).rejects.toThrow(error)
    })

    it('Should return a digest on success', async () => {
      const hashed = await sut.generate({ plaintext })

      expect(hashed).toBe(digest)
    })
  })

  describe('compare()', () => {
    beforeAll(() => {
      fakeBcrypt.compare.mockImplementation(() => true)
    })

    it('Should call compare with correct values', async () => {
      await sut.compare({ plaintext, digest })

      expect(fakeBcrypt.compare).toHaveBeenCalledWith(plaintext, digest)
      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1)
    })

    it('Should return true when compare succeeds', async () => {
      const isValid = await sut.compare({ plaintext, digest })

      expect(isValid).toBe(true)
    })

    it('Should return false when compare fails', async () => {
      fakeBcrypt.compare.mockImplementation(() => false)

      const isValid = await sut.compare({ plaintext, digest })

      expect(isValid).toBe(false)
    })

    it('Should rethrow if compare throw', async () => {
      fakeBcrypt.compare.mockImplementationOnce(() => { throw error })

      const promise = sut.compare({ plaintext, digest })

      await expect(promise).rejects.toThrow(error)
    })
  })
})

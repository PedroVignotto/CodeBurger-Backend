import { BCryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcryptjs'
import faker from 'faker'

jest.mock('bcryptjs')

describe('BcryptAdapter', () => {
  let sut: BCryptAdapter
  let salt: number
  let plaintext: string
  let digest: string
  let error: Error

  let fakeBcrypt: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    salt = 12
    plaintext = faker.random.word()
    digest = faker.datatype.uuid()
    error = new Error(faker.random.word())

    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => digest)
  })

  beforeEach(() => {
    sut = new BCryptAdapter()
  })

  it('Should call hash with correct params', async () => {
    await sut.generate({ plaintext })

    expect(fakeBcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
    expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if hash throw', async () => {
    fakeBcrypt.hash.mockImplementationOnce(() => { throw error })

    const promise = sut.generate({ plaintext })

    await expect(promise).rejects.toThrow(error)
  })
})

import { BCryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcryptjs'
import faker from 'faker'

jest.mock('bcryptjs')

describe('BcryptAdapter', () => {
  let sut: BCryptAdapter
  let salt: number
  let plaintext: string
  let digest: string

  let fakeBcrypt: jest.Mocked<typeof bcrypt>

  beforeAll(() => {
    salt = 12
    plaintext = faker.random.word()
    digest = faker.datatype.uuid()

    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => digest)
  })

  beforeEach(() => {
    sut = new BCryptAdapter()
  })

  it('Should call hash with correct values', async () => {
    await sut.generate({ plaintext })

    expect(fakeBcrypt.hash).toHaveBeenCalledWith(plaintext, salt)
    expect(fakeBcrypt.hash).toHaveBeenCalledTimes(1)
  })
})

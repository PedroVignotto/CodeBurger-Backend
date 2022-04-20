import { JwtAdapter } from '@/infra/gateways'

import jwt from 'jsonwebtoken'
import faker from 'faker'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let secret: string
  let key: string
  let token: string
  let error: Error
  let fakeJwt = jwt as jest.Mocked<typeof jwt>

  beforeAll(() => {
    secret = faker.datatype.uuid()
    key = faker.random.word()
    token = faker.datatype.uuid()
    error = new Error(faker.random.word())

    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => token)
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
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

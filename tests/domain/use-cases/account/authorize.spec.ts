import { TokenValidator } from '@/domain/contracts/gateways'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('Authorize', () => {
  let sut: Authorize

  let accountId: string
  let accessToken: string
  let error: Error

  const token = mock<TokenValidator>()

  beforeAll(() => {
    accountId = faker.datatype.uuid()
    accessToken = faker.datatype.uuid()
    error = new Error(faker.random.word())

    token.validate.mockResolvedValue(accountId)
  })

  beforeEach(() => {
    sut = AuthorizeUseCase(token)
  })

  it('Should call TokenValidator with correct token', async () => {
    await sut({ accessToken })

    expect(token.validate).toHaveBeenCalledWith({ token: accessToken })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if TokenValidator throws', async () => {
    token.validate.mockRejectedValueOnce(error)

    const promise = sut({ accessToken })

    await expect(promise).rejects.toThrow(error)
  })

  it('Should return a accountId on success', async () => {
    const result = await sut({ accessToken })

    expect(result).toBe(accountId)
  })
})

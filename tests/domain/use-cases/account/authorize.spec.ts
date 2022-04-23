import { TokenValidator } from '@/domain/contracts/gateways'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('Authorize', () => {
  let sut: Authorize

  let accountId: string
  let accessToken: string

  const token = mock<TokenValidator>()

  beforeAll(() => {
    accountId = faker.datatype.uuid()
    accessToken = faker.datatype.uuid()

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

  it('Should return a accountId on success', async () => {
    const result = await sut({ accessToken })

    expect(result).toBe(accountId)
  })
})

import { TokenValidator } from '@/domain/contracts/gateways'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'
import faker from 'faker'

describe('Authorize', () => {
  let sut: Authorize

  let accessToken: string

  let token = mock<TokenValidator>()

  beforeAll(() => {
    accessToken = faker.datatype.uuid()
    token = mock()
  })

  beforeEach(() => {
    sut = AuthorizeUseCase(token)
  })

  it('should call TokenValidator with correct token', async () => {
    await sut({ accessToken })

    expect(token.validate).toHaveBeenCalledWith({ token: accessToken })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })
})

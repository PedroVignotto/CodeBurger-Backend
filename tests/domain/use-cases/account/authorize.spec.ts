import { TokenValidator } from '@/domain/contracts/gateways'
import { Authorize, AuthorizeUseCase } from '@/domain/use-cases/account'

import { mock } from 'jest-mock-extended'
import faker from 'faker'
import { CheckAccountRole } from '@/domain/contracts/database/repositories/account/check-account-role'

describe('Authorize', () => {
  let sut: Authorize

  let accountId: string
  let accessToken: string
  let role: string
  let error: Error

  const token = mock<TokenValidator>()
  const accountRepository = mock<CheckAccountRole>()

  beforeAll(() => {
    accountId = faker.datatype.uuid()
    accessToken = faker.datatype.uuid()
    role = faker.random.word()
    error = new Error(faker.random.word())

    token.validate.mockResolvedValue(accountId)
    accountRepository.checkRole.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = AuthorizeUseCase(token, accountRepository)
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

    expect(result).toEqual({ accountId })
  })

  it('Should call CheckAccountRole with correct values', async () => {
    await sut({ accessToken, role })

    expect(accountRepository.checkRole).toHaveBeenCalledWith({ accountId, role })
    expect(accountRepository.checkRole).toHaveBeenCalledTimes(1)
  })

  it('Should return undefined if CheckAccountRole return false', async () => {
    accountRepository.checkRole.mockResolvedValueOnce(false)

    const result = await sut({ accessToken })

    expect(result).toBeUndefined()
  })
})

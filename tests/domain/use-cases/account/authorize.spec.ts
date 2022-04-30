import { accountParams } from '@/tests/mocks'
import { TokenValidator } from '@/domain/contracts/gateways'
import { CheckAccountRole } from '@/domain/contracts/database/repositories/account'
import { Authorize, authorizeUseCase } from '@/domain/use-cases/account'
import { InsuficientPermissionError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('Authorize', () => {
  let sut: Authorize

  const { id: accountId, accessToken, role, error } = accountParams

  const token = mock<TokenValidator>()
  const accountRepository = mock<CheckAccountRole>()

  beforeAll(() => {
    token.validate.mockResolvedValue(accountId)
    accountRepository.checkRole.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = authorizeUseCase(token, accountRepository)
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

  it('Should call CheckAccountRole with correct values', async () => {
    await sut({ accessToken, role })

    expect(accountRepository.checkRole).toHaveBeenCalledWith({ accountId, role })
    expect(accountRepository.checkRole).toHaveBeenCalledTimes(1)
  })

  it('Should return InsuficientPermissionError if CheckAccountRole return false', async () => {
    accountRepository.checkRole.mockResolvedValueOnce(false)

    const result = await sut({ accessToken })

    expect(result).toEqual(new InsuficientPermissionError())
  })

  it('Should return a accountId on success', async () => {
    const result = await sut({ accessToken })

    expect(result).toEqual({ accountId })
  })
})

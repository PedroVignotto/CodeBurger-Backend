import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeTokenAdapter } from '@/main/factories/infra/gateways'
import { Authorize, authorizeUseCase } from '@/domain/use-cases/account'

export const makeAuthorizeUseCase = (): Authorize =>
  authorizeUseCase(makeTokenAdapter(), makeAccountRepository())

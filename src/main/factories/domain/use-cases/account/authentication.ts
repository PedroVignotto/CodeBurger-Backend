import { Authentication, AuthenticationUseCase } from '@/domain/use-cases/account'
import { makeHashAdapter, makeTokenAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'

export const makeAuthenticationUseCase = (): Authentication => {
  return AuthenticationUseCase(makeAccountRepository(), makeHashAdapter(), makeTokenAdapter())
}

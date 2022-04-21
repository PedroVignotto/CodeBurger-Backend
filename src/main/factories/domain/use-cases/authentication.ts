import { Authentication, AuthenticationUseCase } from '@/domain/use-cases'
import { makeHashAdapter, makeTokenAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRepository } from '@/main/factories/infra/repositories/postgres/repositories'

export const makeAuthenticationUseCase = (): Authentication => {
  return AuthenticationUseCase(makeAccountRepository(), makeHashAdapter(), makeTokenAdapter())
}

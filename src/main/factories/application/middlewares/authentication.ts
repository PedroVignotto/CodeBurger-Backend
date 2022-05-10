import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeAuthorizeUseCase } from '@/main/factories/domain/use-cases/account'

export const makeAuthenticationMiddleware = (role?: string): AuthenticationMiddleware =>
  new AuthenticationMiddleware(makeAuthorizeUseCase(), role)

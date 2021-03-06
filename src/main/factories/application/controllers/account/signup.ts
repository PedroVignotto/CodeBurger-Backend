import { makeAddAccountUseCase, makeAuthenticationUseCase } from '@/main/factories/domain/use-cases/account'
import { SignUpController } from '@/application/controllers/account'

export const makeSignUpController = (): SignUpController =>
  new SignUpController(makeAddAccountUseCase(), makeAuthenticationUseCase())

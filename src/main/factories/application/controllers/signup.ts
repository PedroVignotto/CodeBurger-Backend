import { makeAddAccountUseCase, makeAuthenticationUseCase } from '@/main/factories/domain/use-cases/account'
import { SignUpController } from '@/application/controllers'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccountUseCase(), makeAuthenticationUseCase())
}

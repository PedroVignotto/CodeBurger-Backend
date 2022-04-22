import { makeAuthenticationUseCase } from '@/main/factories/domain/use-cases/account'
import { LoginController } from '@/application/controllers'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeAuthenticationUseCase())
}

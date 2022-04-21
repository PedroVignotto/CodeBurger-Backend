import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeHashAdapter } from '@/main/factories/infra/gateways'
import { AddAccount, AddAccountUseCase } from '@/domain/use-cases/account'

export const makeAddAccountUseCase = (): AddAccount => {
  return AddAccountUseCase(makeAccountRepository(), makeHashAdapter())
}

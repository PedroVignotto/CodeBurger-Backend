import { makeAccountRepository } from '@/main/factories/infra/database/postgres/repositories'
import { makeHashAdapter } from '@/main/factories/infra/gateways'
import { AddAccount, addAccountUseCase } from '@/domain/use-cases/account'

export const makeAddAccountUseCase = (): AddAccount =>
  addAccountUseCase(makeAccountRepository(), makeHashAdapter())

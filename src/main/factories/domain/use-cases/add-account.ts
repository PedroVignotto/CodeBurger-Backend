import { makeAccountRepository } from '@/main/factories/infra/repositories/postgres/repositories'
import { makeHashAdapter } from '@/main/factories/infra/gateways'
import { AddAccount, AddAccountUseCase } from '@/domain/use-cases'

export const makeAddAccountUseCase = (): AddAccount => {
  return AddAccountUseCase(makeAccountRepository(), makeHashAdapter())
}

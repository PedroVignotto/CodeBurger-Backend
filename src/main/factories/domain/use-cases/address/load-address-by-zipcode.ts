import { makeSearchAddressByZipCode } from '@/main/factories/infra/gateways'
import { LoadAddressByZipCode, loadAddressByZipCodeUseCase } from '@/domain/use-cases/address'

export const makeLoadAddressByZipCodeUseCase = (): LoadAddressByZipCode => {
  return loadAddressByZipCodeUseCase(makeSearchAddressByZipCode())
}

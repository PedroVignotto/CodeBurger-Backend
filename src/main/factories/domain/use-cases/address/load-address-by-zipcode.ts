import { makeSearchAddressByZipCode } from '@/main/factories/infra/gateways'
import { LoadAddressByZipCode, LoadAddressByZipCodeUseCase } from '@/domain/use-cases/address'

export const makeLoadAddressByZipCodeUseCase = (): LoadAddressByZipCode => {
  return LoadAddressByZipCodeUseCase(makeSearchAddressByZipCode())
}

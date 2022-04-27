import { makeSearchAddressByZipCode } from '@/main/factories/infra/gateways'
import { LoadAddressByZipCode } from '@/domain/use-cases/address'

export const makeLoadAddressByZipCodeUseCase = (): LoadAddressByZipCode => {
  return makeSearchAddressByZipCode().search.bind(makeSearchAddressByZipCode())
}

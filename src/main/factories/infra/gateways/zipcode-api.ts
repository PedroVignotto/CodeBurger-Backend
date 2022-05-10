import { makeHttpClient } from '@/main/factories/infra/gateways'
import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { ZipCodeApi } from '@/infra/gateways'

export const makeSearchAddressByZipCode = (): SearchAddressByZipCode =>
  new ZipCodeApi(makeHttpClient())

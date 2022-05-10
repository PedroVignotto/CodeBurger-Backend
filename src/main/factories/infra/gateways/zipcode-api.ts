import { SearchAddressByZipCode } from '@/domain/contracts/gateways'
import { ZipCodeApi } from '@/infra/gateways'
import { makeHttpClient } from '@/main/factories/infra/gateways/axios-adapter'

export const makeSearchAddressByZipCode = (): SearchAddressByZipCode =>
  new ZipCodeApi(makeHttpClient())

import { makeLoadAddressByZipCodeUseCase } from '@/main/factories/domain/use-cases/address'
import { LoadAddressByZipCodeController } from '@/application/controllers/address'

export const makeLoadAddressByZipCodeController = (): LoadAddressByZipCodeController => {
  return new LoadAddressByZipCodeController(makeLoadAddressByZipCodeUseCase())
}

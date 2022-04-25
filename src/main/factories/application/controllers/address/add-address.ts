import { makeAddAddressUseCase } from '@/main/factories/domain/use-cases/address'
import { AddAddressController } from '@/application/controllers/address'

export const makeAddAddressController = (): AddAddressController => {
  return new AddAddressController(makeAddAddressUseCase())
}

import { makeAddAddressUseCase } from '@/main/factories/domain/use-cases/address'
import { AddAddressController } from '@/application/controllers/address'

export const makeAddAddressController = (): AddAddressController =>
  new AddAddressController(makeAddAddressUseCase())

import { makeListAddressesUseCase } from '@/main/factories/domain/use-cases/address'
import { ListAddressesController } from '@/application/controllers/address'

export const makeListAddressesController = (): ListAddressesController => {
  return new ListAddressesController(makeListAddressesUseCase())
}

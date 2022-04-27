import { makeDeleteAddressUseCase } from '@/main/factories/domain/use-cases/address'
import { DeleteAddressController } from '@/application/controllers/address'

export const makeDeleteAddressController = (): DeleteAddressController => {
  return new DeleteAddressController(makeDeleteAddressUseCase())
}

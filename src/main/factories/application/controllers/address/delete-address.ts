import { makeDeleteAddressUseCase } from '@/main/factories/domain/use-cases/address'
import { DeleteAddressController } from '@/application/controllers/address'

export const makeDeleteAddressController = (): DeleteAddressController =>
  new DeleteAddressController(makeDeleteAddressUseCase())

import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { DeleteAddress } from '@/domain/use-cases/address'

type HttpRequest = { id: string }
type Model = undefined | Error

export class DeleteAddressController extends Controller {
  constructor (private readonly deleteAddress: DeleteAddress) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.deleteAddress({ id })

    return ok(undefined)
  }
}

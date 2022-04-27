import { Controller } from '@/application/controllers/controller'
import { InvalidFieldError } from '@/application/errors'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { DeleteAddress } from '@/domain/use-cases/address'

type HttpRequest = { id: string }
type Model = undefined | Error

export class DeleteAddressController extends Controller {
  constructor (private readonly deleteAddress: DeleteAddress) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    const address = await this.deleteAddress({ id })

    if (!address) return badRequest(new InvalidFieldError('id'))

    return ok(undefined)
  }
}

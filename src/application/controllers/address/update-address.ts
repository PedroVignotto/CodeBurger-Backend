import { Controller } from '@/application/controllers/controller'
import { InvalidFieldError } from '@/application/errors'
import { badRequest, HttpResponse, noContent } from '@/application/helpers'
import { UpdateAddress } from '@/domain/use-cases/address'

type HttpRequest = { id: string, surname?: string, number?: number, complement?: string }

export class UpdateAddressController extends Controller {
  constructor (private readonly updateAddress: UpdateAddress) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    const address = await this.updateAddress(httpRequest)

    if (!address) return badRequest(new InvalidFieldError('id'))

    return noContent()
  }
}

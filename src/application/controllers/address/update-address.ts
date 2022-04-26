import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { UpdateAddress } from '@/domain/use-cases/address'

type HttpRequest = { id: string, surname?: string, number?: number, complement?: string }

export class UpdateAddressController extends Controller {
  constructor (private readonly updateAddress: UpdateAddress) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.updateAddress(httpRequest)

    return noContent()
  }
}

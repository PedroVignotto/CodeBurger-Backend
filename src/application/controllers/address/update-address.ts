import { Controller } from '@/application/controllers/controller'
import { badRequest, HttpResponse, noContent } from '@/application/helpers'
import { UpdateAddress } from '@/domain/use-cases/address'

type HttpRequest = { id: string, surname?: string, number?: number, complement?: string }

export class UpdateAddressController extends Controller {
  constructor (private readonly updateAddress: UpdateAddress) { super() }

  async perform ({ id, surname, number, complement }: HttpRequest): Promise<HttpResponse> {
    const address = await this.updateAddress({ id, surname, number, complement })

    if (address instanceof Error) return badRequest(address)

    return noContent()
  }
}

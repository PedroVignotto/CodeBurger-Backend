import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { UpdateAddress } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string, id: string, surname?: string, number?: number, complement?: string, active?: boolean }

export class UpdateAddressController extends Controller {
  constructor (private readonly updateAddress: UpdateAddress) { super() }

  async perform ({ accountId, id, surname, number, complement, active }: HttpRequest): Promise<HttpResponse> {
    await this.updateAddress({ accountId, id, surname, number, complement, active })

    return noContent()
  }
}

import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { ListAddress } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string }
type Model = undefined

export class ListAddressController extends Controller {
  constructor (private readonly listAddress: ListAddress) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.listAddress({ accountId })

    return ok(undefined)
  }
}

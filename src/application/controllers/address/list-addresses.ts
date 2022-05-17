import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { ListAddresses } from '@/domain/use-cases/address'

type HttpRequest = { accountId: string }
type Model = Array<{
  id: string
  surname: string
  zipCode: string
  district: string
  street: string
  number: number
  complement?: string
  active: boolean
}>

export class ListAddressesController extends Controller {
  constructor (private readonly listAddresses: ListAddresses) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse<Model>> {
    const addresses = await this.listAddresses({ accountId })

    return ok(addresses)
  }
}

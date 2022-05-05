import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { ListOrders } from '@/domain/use-cases/order'

type HttpRequest = { accountId: string }
type Model = undefined

export class ListOrderController extends Controller {
  constructor (private readonly listOrders: ListOrders) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.listOrders({ accountId })

    return ok(undefined)
  }
}

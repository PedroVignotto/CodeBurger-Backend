import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { Order } from '@/domain/contracts/database/repositories/order'
import { ListOrders } from '@/domain/use-cases/order'

type HttpRequest = { accountId: string }
type Model = Order[]

export class ListOrdersController extends Controller {
  constructor (private readonly listOrders: ListOrders) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse<Model>> {
    const order = await this.listOrders({ accountId })

    return ok(order)
  }
}

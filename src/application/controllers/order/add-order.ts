import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created, badRequest } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddOrder } from '@/domain/use-cases/order'

type HttpRequest = { accountId: string, productsId: string[], note?: string, total: number, paymentMode: string }
type Model = undefined | Error

export class AddOrderController extends Controller {
  constructor (private readonly addOrder: AddOrder) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const order = await this.addOrder(httpRequest)

    if (order instanceof Error) return badRequest(order)

    return created(order)
  }

  override buildValidators ({ productsId, total, paymentMode }: HttpRequest): Validator[] {
    return [
      ...Builder.of(productsId, 'productsId').required().build(),
      ...Builder.of(total, 'total').required().build(),
      ...Builder.of(paymentMode, 'paymentMode').required().build()
    ]
  }
}

import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddOrder } from '@/domain/use-cases/order'

type HttpRequest = { accountId: string, productsId: string[], note?: string, paymentMode: string }

export class AddOrderController extends Controller {
  constructor (private readonly addOrder: AddOrder) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addOrder(httpRequest)

    return created(undefined)
  }

  override buildValidators ({ productsId, paymentMode }: HttpRequest): Validator[] {
    return [
      ...Builder.of(productsId, 'productsId').required().build(),
      ...Builder.of(paymentMode, 'paymentMode').required().build()
    ]
  }
}

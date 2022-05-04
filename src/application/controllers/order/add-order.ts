import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { accountId: string, productsId: string[], note?: string, total: number, paymentMode: string }
type Model = undefined | Error

export class AddOrderController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    return created(undefined)
  }

  override buildValidators ({ accountId, productsId, total, paymentMode }: HttpRequest): Validator[] {
    return [
      ...Builder.of(accountId, 'accountId').required().build(),
      ...Builder.of(productsId, 'productsId').required().build(),
      ...Builder.of(total, 'total').required().build(),
      ...Builder.of(paymentMode, 'paymentMode').required().build()
    ]
  }
}

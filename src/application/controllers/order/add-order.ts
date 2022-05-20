import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddOrder } from '@/domain/use-cases/order'

type HttpRequest = { accountId: string, productsId: string[] }

export class AddOrderController extends Controller {
  constructor (private readonly addOrder: AddOrder) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addOrder(httpRequest)

    return created(undefined)
  }

  override buildValidators ({ productsId }: HttpRequest): Validator[] {
    return [
      ...Builder.of(productsId, 'productsId').required().build()
    ]
  }
}

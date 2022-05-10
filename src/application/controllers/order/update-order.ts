import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { UpdateOrder } from '@/domain/use-cases/order'

type HttpRequest = { id: string, status: string }

export class UpdateOrderController extends Controller {
  constructor (private readonly updateOrder: UpdateOrder) { super() }

  async perform ({ id, status }: HttpRequest): Promise<HttpResponse> {
    await this.updateOrder({ id, status })

    return noContent()
  }

  override buildValidators ({ status }: HttpRequest): Validator[] {
    return [
      ...Builder.of(status, 'status').required().build()
    ]
  }
}

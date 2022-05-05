import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { id: string, status: string }

export class UpdateOrderController extends Controller {
  async perform ({ id, status }: HttpRequest): Promise<HttpResponse> {
    return noContent()
  }

  override buildValidators ({ status }: HttpRequest): Validator[] {
    return [
      ...Builder.of(status, 'status').required().build()
    ]
  }
}

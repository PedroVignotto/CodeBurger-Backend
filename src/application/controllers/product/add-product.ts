import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }
type Model = undefined | Error

export class AddProductController extends Controller {
  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    return created(undefined)
  }

  override buildValidators ({ categoryId, name, description, price, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of(categoryId, 'categoryId').required().build(),
      ...Builder.of(name, 'name').required().build(),
      ...Builder.of(description, 'description').required().build(),
      ...Builder.of(price, 'price').required().build(),
      ...Builder.of(file, 'file').image({ AllowedMimeTypes: ['png', 'jpg'], maxSizeInMb: 5 }).build()
    ]
  }
}

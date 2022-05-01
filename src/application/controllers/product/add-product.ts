import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddProduct } from '@/domain/use-cases/product'

type HttpRequest = { categoryId: string, name: string, description: string, price: number, file?: { buffer: Buffer, mimeType: string } }
type Model = undefined | Error

export class AddProductController extends Controller {
  constructor (private readonly addProduct: AddProduct) { super() }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.addProduct(httpRequest)

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

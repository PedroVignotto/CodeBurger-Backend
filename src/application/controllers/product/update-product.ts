import { Controller } from '@/application/controllers/controller'
import { badRequest, HttpResponse, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { UpdateProduct } from '@/domain/use-cases/product'

type HttpRequest = {
  id: string
  name?: string
  categoryId?: string
  description?: string
  price?: number
  available?: boolean
  file?: { buffer: Buffer, mimeType: string }
}

export class UpdateProductController extends Controller {
  constructor (private readonly updateProduct: UpdateProduct) { super() }

  async perform (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const product = await this.updateProduct(HttpRequest)

    if (product instanceof Error) return badRequest(product)

    return noContent()
  }

  override buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of(id, 'id').required().build(),
      ...Builder.of(file, 'file').image({ AllowedMimeTypes: ['png', 'jpg'], maxSizeInMb: 5 }).build()
    ]
  }
}

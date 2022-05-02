import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

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
  async perform (HttpRequest: HttpRequest): Promise<HttpResponse> {
    return noContent()
  }

  override buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...Builder.of(id, 'id').required().build(),
      ...Builder.of(file, 'file').image({ AllowedMimeTypes: ['png', 'jpg'], maxSizeInMb: 5 }).build()
    ]
  }
}

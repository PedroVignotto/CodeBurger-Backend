import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { DeleteProduct } from '@/domain/use-cases/product'

type HttpRequest = { id: string }

export class DeleteProductController extends Controller {
  constructor (private readonly deleteProduct: DeleteProduct) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteProduct({ id })

    return noContent()
  }
}

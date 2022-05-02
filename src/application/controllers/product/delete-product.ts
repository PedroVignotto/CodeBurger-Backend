import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { DeleteProduct } from '@/domain/use-cases/product'

type HttpRequest = { id: string }
type Model = undefined | Error

export class DeleteProductController extends Controller {
  constructor (private readonly deleteProduct: DeleteProduct) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.deleteProduct({ id })

    return noContent()
  }
}

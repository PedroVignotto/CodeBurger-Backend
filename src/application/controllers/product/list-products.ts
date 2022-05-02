import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { ListProducts } from '@/domain/use-cases/product'

type HttpRequest = { categoryId: string }
type Model = undefined

export class ListProductsController extends Controller {
  constructor (private readonly listProducts: ListProducts) { super() }

  async perform ({ categoryId }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.listProducts({ categoryId })

    return ok(undefined)
  }
}

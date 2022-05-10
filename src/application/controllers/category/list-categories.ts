import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { ListCategories } from '@/domain/use-cases/category'

type Model = Array<{ id: string, name: string }>

export class ListCategoriesController extends Controller {
  constructor (private readonly listCategories: ListCategories) { super() }

  async perform (): Promise<HttpResponse<Model>> {
    const categories = await this.listCategories()

    return ok(categories)
  }
}

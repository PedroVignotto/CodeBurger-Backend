import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok } from '@/application/helpers'
import { DeleteCategory } from '@/domain/use-cases/category'

type HttpRequest = { id: string }
type Model = undefined | Error

export class DeleteCategoryController extends Controller {
  constructor (private readonly deleteCategory: DeleteCategory) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    await this.deleteCategory({ id })

    return ok(undefined)
  }
}

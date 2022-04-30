import { Controller } from '@/application/controllers/controller'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { DeleteCategory } from '@/domain/use-cases/category'

type HttpRequest = { id: string }
type Model = undefined | Error

export class DeleteCategoryController extends Controller {
  constructor (private readonly deleteCategory: DeleteCategory) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    const category = await this.deleteCategory({ id })

    if (category instanceof Error) return badRequest(category)

    return ok(undefined)
  }
}

import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers'
import { DeleteCategory } from '@/domain/use-cases/category'

type HttpRequest = { id: string }

export class DeleteCategoryController extends Controller {
  constructor (private readonly deleteCategory: DeleteCategory) { super() }

  async perform ({ id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteCategory({ id })

    return noContent()
  }
}

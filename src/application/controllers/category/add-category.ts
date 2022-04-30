import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created, badRequest } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddCategory } from '@/domain/use-cases/category'

type HttpRequest = { name: string }
type Model = undefined | Error

export class AddCategoryController extends Controller {
  constructor (private readonly addCategory: AddCategory) { super() }

  async perform ({ name }: HttpRequest): Promise<HttpResponse<Model>> {
    const category = await this.addCategory({ name })

    if (category instanceof Error) return badRequest(category)

    return created(undefined)
  }

  override buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build()
    ]
  }
}

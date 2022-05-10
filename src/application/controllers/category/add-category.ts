import { Controller } from '@/application/controllers/controller'
import { HttpResponse, created } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { AddCategory } from '@/domain/use-cases/category'

type HttpRequest = { name: string }
type Model = { id: string, name: string }

export class AddCategoryController extends Controller {
  constructor (private readonly addCategory: AddCategory) { super() }

  async perform ({ name }: HttpRequest): Promise<HttpResponse<Model>> {
    const category = await this.addCategory({ name })

    return created(category)
  }

  override buildValidators ({ name }: HttpRequest): Validator[] {
    return [
      ...Builder.of(name, 'name').required().build()
    ]
  }
}

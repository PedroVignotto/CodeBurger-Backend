export interface AddOrderRepository {
  create: (input: AddOrderRepository.Input) => Promise<AddOrderRepository.Output>
}

export namespace AddOrderRepository {
  export type Input = { accountId: string, products: Product[], note?: string, total: number, paymentMode: string }
  export type Output = void
}

type Product = {
  id: string
  categoryId?: string
  name: string
  description: string
  price: number
  available: boolean
  picture?: string
}

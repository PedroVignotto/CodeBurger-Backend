export interface ListOrdersRepository {
  list: (input: ListOrdersRepository.Input) => Promise<ListOrdersRepository.Output>
}

export namespace ListOrdersRepository {
  export type Input = { accountId: string }
  export type Output = Order[]
}

export type Order = {
  id: string
  products: Product[]
  total: number
  status: string
  createdAt: Date
  updatedAt: Date
  complement?: string
}

export type Product = {
  id: string
  categoryId?: string
  name: string
  description: string
  price: number
  available: boolean
  picture?: string
}

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
  note?: string
  total: number
  paymentMode: string
  status: string
  createdAt: Date
  complement?: string
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

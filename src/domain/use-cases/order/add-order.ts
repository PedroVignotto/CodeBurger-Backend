import { AddOrderRepository, Product } from '@/domain/contracts/database/repositories/order'
import { LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: LoadProductRepository, orderRepository: AddOrderRepository) => AddOrder
type Input = { accountId: string, productsId: string[] }
type Output = void
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = (productRepository, orderRepository) => async ({ accountId, productsId }) => {
  const result = await Promise.all(productsId.map(async id => await productRepository.load({ id })))

  const products = result.filter(item => item) as Product[]

  if (products.length <= 0) throw new NonExistentFieldError('productsId')

  const total = products.reduce((oldPrice, product) => oldPrice + +product.price, 0)

  await orderRepository.create({ accountId, products, total })
}

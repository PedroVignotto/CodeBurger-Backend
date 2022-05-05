import { AddOrderRepository } from '@/domain/contracts/database/repositories/order'
import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError, ValueNotExpectedError } from '@/domain/errors'

type Setup = (productRepository: LoadProductsRepository, orderRepository: AddOrderRepository) => AddOrder
type Input = { accountId: string, productsId: string[], note?: string, total: number, paymentMode: string }
type Output = undefined | Error
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = (productRepository, orderRepository) => async ({ accountId, productsId, note, total, paymentMode }) => {
  const products = await productRepository.loadAll({ ids: productsId })

  if (products.length <= 0) return new NonExistentFieldError('productsId')

  const sum = products.reduce((oldPrice, product) => oldPrice + product.price, 0)

  if (sum !== total) return new ValueNotExpectedError('total')

  await orderRepository.create({ accountId, products, note, total, paymentMode })
}

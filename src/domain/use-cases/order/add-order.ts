import { AddOrderRepository } from '@/domain/contracts/database/repositories/order'
import { LoadProductsRepository } from '@/domain/contracts/database/repositories/product'
import { NonExistentFieldError } from '@/domain/errors'

type Setup = (productRepository: LoadProductsRepository, orderRepository: AddOrderRepository) => AddOrder
type Input = { accountId: string, productsId: string[], note?: string, total: number, paymentMode: string }
type Output = undefined | Error
export type AddOrder = (input: Input) => Promise<Output>

export const addOrderUseCase: Setup = (productRepository, orderRepository) => async ({ accountId, productsId, note, total, paymentMode }) => {
  const products = await productRepository.loadAll({ productsId })

  if (products.length <= 0) return new NonExistentFieldError('productsId')

  await orderRepository.create({ accountId, products, note, total, paymentMode })
}

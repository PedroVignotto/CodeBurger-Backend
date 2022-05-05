import { Order } from '@/domain/contracts/database/repositories/order'

type Input = { accountId: string }
type Output = Order[]
export type ListOrders = (input: Input) => Promise<Output>

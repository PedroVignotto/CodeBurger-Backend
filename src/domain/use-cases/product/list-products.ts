type Input = { categoryId?: string, available?: boolean }
type Output = Array<{ id: string, categoryId?: string, name: string, description: string, price: number, available: boolean, picture?: string }>
export type ListProducts = (input: Input) => Promise<Output>

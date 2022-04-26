type Input = { id: string, surname?: string, number?: number, complement?: string }
type Output = void
export type UpdateAddress = (input: Input) => Promise<Output>

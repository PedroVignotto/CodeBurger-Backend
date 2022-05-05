export interface UpdateOrderRepository {
  update: (input: UpdateOrderRepository.Input) => Promise<UpdateOrderRepository.Output>
}

export namespace UpdateOrderRepository {
  export type Input = { id: string, status: string }
  export type Output = void
}

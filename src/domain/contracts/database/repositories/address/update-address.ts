export interface UpdateAddressRepository {
  update: (input: UpdateAddressRepository.Input) => Promise<UpdateAddressRepository.Output>
}

export namespace UpdateAddressRepository {
  export type Input = { id: string, surname?: string, number?: number, complement?: string, active?: boolean }
  export type Output = void
}

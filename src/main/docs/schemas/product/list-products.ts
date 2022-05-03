export const listProductsResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      categoryId: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      available: { type: 'boolean' },
      picture: { type: 'string' }
    }
  }
}

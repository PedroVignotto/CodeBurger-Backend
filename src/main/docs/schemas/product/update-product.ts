export const updateProductRequest = {
  type: 'object',
  properties: {
    categoryId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    available: { type: 'boolean' },
    picture: { type: 'string', format: 'binary' }
  }
}

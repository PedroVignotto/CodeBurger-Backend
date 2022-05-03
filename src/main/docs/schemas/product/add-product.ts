export const addProductRequest = {
  type: 'object',
  properties: {
    categoryId: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    picture: { type: 'string', format: 'binary' }
  },
  required: ['categoryId', 'name', 'description', 'price']
}

export const addProductResponse = {
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

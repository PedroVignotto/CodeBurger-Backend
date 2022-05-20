export const listOrdersResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      products: { type: 'array', items: { $ref: '#/schemas/listProductsResponse' } },
      total: { type: 'number' },
      status: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' }
    }
  }
}

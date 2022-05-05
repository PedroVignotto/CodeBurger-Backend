export const listOrdersResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      products: { type: 'array', items: { $ref: '#/schemas/listProductsResponse' } },
      note: { type: 'string' },
      total: { type: 'number' },
      paymentMode: { type: 'string' },
      status: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' }
    }
  }
}

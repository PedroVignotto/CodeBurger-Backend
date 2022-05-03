export const listProducts = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Product'],
    summary: 'Route to list all products',
    parameters: [{
      in: 'query',
      name: 'categoryId',
      required: false,
      schema: { type: 'string' }
    }],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listProductsResponse' } } } },
      500: { $ref: '#/components/serverError' }
    }
  }
}

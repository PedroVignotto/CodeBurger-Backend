export const addProduct = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Product'],
    summary: 'Route to create a new product',
    requestBody: { content: { 'multipart/form-data': { schema: { $ref: '#/schemas/addProductRequest' } } } },
    responses: {
      201: {
        content: { 'application/json': { schema: { $ref: '#/schemas/addProductResponse' } } }
      },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}

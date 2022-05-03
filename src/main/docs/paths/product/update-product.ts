export const updateProduct = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Product'],
    summary: 'Route to update product info',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    requestBody: { content: { 'multipart/form-data': { schema: { $ref: '#/schemas/updateProductRequest' } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}

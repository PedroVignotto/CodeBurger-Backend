export const addCategory = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to create a new category',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/addCategoryRequest' } } } },
    responses: {
      201: { content: { 'application/json': { schema: { $ref: '#/schemas/addCategoryResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}

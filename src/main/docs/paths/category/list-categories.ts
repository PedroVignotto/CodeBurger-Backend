export const listCategories = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to list all categories',
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listCategoriesResponse' } } } },
      500: { $ref: '#/components/serverError' }
    }
  }
}

export const deleteCategory = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to delete category',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: { type: 'string' }
    }],
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}

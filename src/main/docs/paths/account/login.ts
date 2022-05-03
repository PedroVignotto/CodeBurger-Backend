export const login = {
  post: {
    tags: ['Account'],
    summary: 'Route to perform authentication',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/loginRequest' } } } },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/loginResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      500: { $ref: '#/components/serverError' }
    }
  }
}

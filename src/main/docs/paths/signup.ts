export const signup = {
  post: {
    tags: ['Account'],
    summary: 'Route to create a new account',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/signUpRequest' } } } },
    responses: {
      201: {
        description: 'Account created on success',
        content: { 'application/json': { schema: { $ref: '#/schemas/signUpResponse' } } }
      },
      400: { $ref: '#/components/badRequest' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}

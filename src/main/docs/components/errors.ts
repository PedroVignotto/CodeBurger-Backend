const error = '#/schemas/error'

export const badRequest = {
  description: 'Invalid data is provided',
  content: { 'application/json': { schema: { $ref: error } } }
}

export const unauthorized = {
  description: 'Unauthorized',
  content: { 'application/json': { schema: { $ref: error } } }
}

export const forbidden = {
  description: 'Access denied',
  content: { 'application/json': { schema: { $ref: error } } }
}

export const serverError = {
  description: 'Internal server error',
  content: { 'application/json': { schema: { $ref: error } } }
}

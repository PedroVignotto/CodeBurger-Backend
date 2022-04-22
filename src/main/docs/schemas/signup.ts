export const signUpRequest = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    passwordConfirmation: { type: 'string' }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation']
}

export const signUpResponse = {
  type: 'object',
  properties: { name: { type: 'string' }, accessToken: { type: 'string' } }
}

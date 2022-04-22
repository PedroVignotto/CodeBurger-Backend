import { signup, login } from '@/main/docs/paths'
import { signUpRequest, signUpResponse, error, loginRequest, loginResponse } from '@/main/docs/schemas'
import { badRequest, forbidden, serverError, unauthorized } from '@/main/docs/components'

export const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Code Burguer',
    description: 'API created for the Code Burguer application',
    version: '1.0.0',
    contact: {
      name: 'Pedro Vignotto',
      url: 'https://www.linkedin.com/in/pedro-vignotto/'
    }
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Account' }],
  paths: { '/signup': signup, '/login': login },
  schemas: { signUpRequest, signUpResponse, error, loginRequest, loginResponse },
  components: { badRequest, forbidden, serverError, unauthorized }
}

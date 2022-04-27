import { signup, login } from '@/main/docs/paths/account'
import { addAddress, deleteAddress, listAddresses, loadAddressByZipCode, updateAddress } from '@/main/docs/paths/address'
import { signUpRequest, signUpResponse, loginRequest, loginResponse } from '@/main/docs/schemas/account'
import { loadAddressByZipCodeResponse, addAddressRequest, listAddressesResponse, updateAddressRequest } from '@/main/docs/schemas/address'
import { error } from '@/main/docs/schemas/errors'
import { badRequest, forbidden, securitySchemes, serverError, unauthorized } from '@/main/docs/components'

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
  tags: [{ name: 'Account' }, { name: 'Address' }],
  paths: {
    '/signup': signup,
    '/login': login,
    '/address/{zipCode}': loadAddressByZipCode,
    '/address': addAddress,
    '/addresses': listAddresses,
    '/address/{id}': updateAddress,
    '/address/{id} ': deleteAddress
  },
  schemas: {
    error,
    signUpRequest,
    signUpResponse,
    loginRequest,
    loginResponse,
    loadAddressByZipCodeResponse,
    addAddressRequest,
    listAddressesResponse,
    updateAddressRequest
  },
  components: { securitySchemes, badRequest, forbidden, serverError, unauthorized }
}

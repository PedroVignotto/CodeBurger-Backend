import { badRequest, forbidden, securitySchemes, serverError, unauthorized } from '@/main/docs/components'
import { signup, login } from '@/main/docs/paths/account'
import { addAddress, deleteAddress, listAddresses, loadAddressByZipCode, updateAddress } from '@/main/docs/paths/address'
import { addCategory, deleteCategory, listCategories } from '@/main/docs/paths/category'
import { addProduct, deleteProduct, listProducts, updateProduct } from '@/main/docs/paths/product'
import { error } from '@/main/docs/schemas/errors'
import { signUpRequest, signUpResponse, loginRequest, loginResponse } from '@/main/docs/schemas/account'
import { loadAddressByZipCodeResponse, addAddressRequest, addAddressResponse, listAddressesResponse, updateAddressRequest } from '@/main/docs/schemas/address'
import { addCategoryRequest, addCategoryResponse, listCategoriesResponse } from '@/main/docs/schemas/category'
import { addProductRequest, addProductResponse, listProductsResponse, updateProductRequest } from '@/main/docs/schemas/product'

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
  tags: [{ name: 'Account' }, { name: 'Address' }, { name: 'Category' }, { name: 'Product' }],
  paths: {
    '/signup': signup,
    '/login': login,
    '/address/{zipCode}': loadAddressByZipCode,
    '/address': addAddress,
    '/addresses': listAddresses,
    '/address/{id}': updateAddress,
    '/address/{id} ': deleteAddress,
    '/category': addCategory,
    '/categories': listCategories,
    '/category/{id}': deleteCategory,
    '/product': addProduct,
    '/products': listProducts,
    '/product/{id}': updateProduct,
    '/product/{id} ': deleteProduct
  },
  schemas: {
    error,
    signUpRequest,
    signUpResponse,
    loginRequest,
    loginResponse,
    loadAddressByZipCodeResponse,
    addAddressRequest,
    addAddressResponse,
    listAddressesResponse,
    updateAddressRequest,
    addCategoryRequest,
    addCategoryResponse,
    listCategoriesResponse,
    addProductRequest,
    addProductResponse,
    listProductsResponse,
    updateProductRequest
  },
  components: { securitySchemes, badRequest, forbidden, serverError, unauthorized }
}

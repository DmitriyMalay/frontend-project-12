const path = ''
// const apiPath = '/api/v1'

export default {
  mainPage: () => '/',
  loginPage: () => [path, 'login'].join('/'),
  notFoundPage: () => [path, '*'].join('/'),
  login: () => ['/api/v1/login'].join('/'),
}
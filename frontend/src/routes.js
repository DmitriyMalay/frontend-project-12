const path = '';

export default {
  mainPage: () => '/',
  loginPage: () => [path, 'login'].join('/'),
  notFoundPage: () => [path, '*'].join('/'),
  login: () => ['/api/v1/login'].join('/'),
  signUpPage: () => [path, 'signup'].join('/'),
};

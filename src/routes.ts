const routes = {
  login: {
    name: 'auth.login',
    path: '/login'
  },
  register: {
    name: 'auth.register',
    path: '/register'
  }
} as const;

export default routes;

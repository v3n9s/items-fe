const routes = {
  home: {
    name: 'nav.home',
    path: '/'
  },
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

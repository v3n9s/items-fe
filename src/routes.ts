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
  },
  user: {
    name: '',
    path: '/users/:userId',
    createUrl: (userId: number) => `/users/${userId}`
  }
} as const;

export default routes;

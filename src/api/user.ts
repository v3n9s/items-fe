import { emptyBaseApi } from '.';
import { User } from '../types/user';

const usersApi = emptyBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET'
      })
    }),
    getUser: builder.query<User, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET'
      })
    })
  })
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery
} = usersApi;

import { emptyBaseApi } from '.';
import { UserAuthData, UserAuthState } from '../types/user';

const authApi = emptyBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserAuthState, UserAuthData>({
      query: (userData) => ({
        url: '/auth/login',
        method: 'POST',
        body: userData
      })
    }),
    registerUser: builder.mutation<null, UserAuthData>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      })
    })
  })
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation
} = authApi;

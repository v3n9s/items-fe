import { emptyBaseApi } from '.';
import { showAlertFor } from '../store/alertsSlice';
import { setAuth } from '../store/authSlice';
import { UserAuthData, UserAuthState } from '../types/user';

const authApi = emptyBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserAuthState, UserAuthData>({
      queryFn: async (userData, { dispatch }, extra, baseQuery) => {
        const response = await baseQuery({
          url: '/auth/login',
          method: 'POST',
          body: userData
        });
        if (response.data) {
          dispatch(setAuth(response.data as UserAuthState));
          dispatch(showAlertFor({
            message: 'auth.rightCredentials',
            color: 'success'
          }));
          return {
            data: response.data as UserAuthState
          };
        }
        if (response.error?.status === 404) {
          dispatch(showAlertFor({
            message: 'auth.wrongCredentials',
            color: 'danger'
          }));
        }
        return {
          error: response.error
        };
      }
    }),
    registerUser: builder.mutation<null, UserAuthData>({
      queryFn: async (userData, { dispatch }, extra, baseQuery) => {
        const response = await baseQuery({
          url: '/auth/register',
          method: 'POST',
          body: userData
        });
        if (response.data === null) {
          dispatch(showAlertFor({
            message: 'auth.userRegistered',
            color: 'success'
          }));
          return {
            data: response.data
          };
        }
        if (response.error?.status === 409) {
          dispatch(showAlertFor({
            message: 'auth.userAlreadyExist',
            color: 'danger',
            tOptions: {
              name: userData.name
            }
          }));
        }
        return {
          error: response.error
        };
      }
    })
  })
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation
} = authApi;

import { Action, createSelector, createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { UserAuthState } from '../types/user';
import { ReplaceValuesWithNull } from '../types/utils';

type AuthState = UserAuthState | ReplaceValuesWithNull<UserAuthState>;

const setAuthInitialState = (auth: AuthState) => {
  localStorage.setItem('auth', JSON.stringify(auth));
}

const getAuthInitialState = (): AuthState => {
  const auth = JSON.parse(localStorage.getItem('auth') || 'null');
  return auth?.accessToken && auth?.refreshToken && auth?.user
    ? auth
    : {
      accessToken: null,
      refreshToken: null,
      user: null
    };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthInitialState(),
  reducers: {
    setAuth: (state, action: PayloadAction<UserAuthState>) => {
      return action.payload;
    },
    resetAuth: () => {
      return {
        accessToken: null,
        refreshToken: null,
        user: null
      };
    }
  }
});

export const authMiddleware: Middleware = () => (next) => (action: Action) => {
  if (authSlice.actions.setAuth.match(action)) {
    setAuthInitialState(action.payload);
  } else if (authSlice.actions.resetAuth.match(action)) {
    setAuthInitialState({ accessToken: null, refreshToken: null, user: null });
  }
  return next(action);
}

export const canManipulateSelectorCreator = (userId: number) => createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user?.isAdmin || auth.user?.id === userId
);

export const isLoggedInSelector = (state: RootState) => state.auth.accessToken;

export const { setAuth, resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;

import { Action, createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface EmptyAuthState {
  accessToken: null;
  refreshToken: null;
  user: null;
}

interface TruthyAuthState {
  accessToken: string;
  refreshToken: string;
  user: User;
}

type AuthState = TruthyAuthState | EmptyAuthState;

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
    setAuth: (state, action: PayloadAction<TruthyAuthState>) => {
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

export const { setAuth, resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { emptyBaseApi } from '../api';
import { authMiddleware, authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptyBaseApi.reducerPath]: emptyBaseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authMiddleware, emptyBaseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

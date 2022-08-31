import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { emptyBaseApi } from '../api';
import { alertsReducer } from './alertsSlice';
import { authMiddleware, authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alerts: alertsReducer,
    [emptyBaseApi.reducerPath]: emptyBaseApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authMiddleware, emptyBaseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkAction = ThunkAction<void, RootState, unknown, AnyAction>;

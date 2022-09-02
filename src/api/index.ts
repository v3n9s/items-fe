import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: config.BACKEND_URL,
  prepareHeaders: (headers, api) => {
    const { accessToken } = (api.getState() as RootState).auth;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  }
});

export const emptyBaseApi = createApi({
  baseQuery,
  endpoints: () => ({})
});

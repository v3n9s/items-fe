import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.BACKEND_URL
});

export const emptyBaseApi = createApi({
  baseQuery,
  endpoints: () => ({})
});

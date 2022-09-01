import { emptyBaseApi } from '.';
import { Collection } from '../types/collection';

const collectionApi = emptyBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<Collection[], number>({
      query: (userId) => ({
        url: '/collections',
        params: {
          userId
        }
      })
    })
  })
});

export const {
  useGetCollectionsQuery,
  useLazyGetCollectionsQuery
} = collectionApi;

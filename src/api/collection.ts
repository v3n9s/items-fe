import { emptyBaseApi } from '.';
import { Collection } from '../types/collection';
import { User } from '../types/user';

type CreateCollectionResponse = Collection & {
  user: Pick<User, 'id'>;
};

const collectionApi = emptyBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<Collection[], number>({
      query: (userId) => ({
        url: '/collections',
        params: {
          userId
        }
      })
    }),
    createCollection: builder.mutation<CreateCollectionResponse, Pick<Collection, 'name' | 'description'>>({
      queryFn: async (collection, api, extra, baseQuery) => {
        const response = await baseQuery({
          url: '/collections',
          method: 'POST',
          body: collection
        });
        if (response.data) {
          return {
            data: response.data as CreateCollectionResponse
          }
        }
        return {
          error: response.error
        };
      },
      onQueryStarted: async (collection, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            collectionApi.util.updateQueryData(
              'getCollections',
              data.user.id,
              (draft) => {
                draft.push(data);
              }
            )
          )
        } catch(e) {}
      }
    }),
    deleteCollection: builder.mutation<null, Pick<Collection, 'id'> & { userId: number }>({
      query: ({ id }) => ({
        url: `/collections/${id}`,
        method: 'DELETE'
      }),
      onQueryStarted: async ({ id: collectionId, userId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            collectionApi.util.updateQueryData(
              'getCollections',
              userId,
              (draft) => {
                return draft.filter(({ id }) => id !== collectionId)
              }
            )
          );
        } catch (e) {}
      }
    })
  })
});

export const {
  useGetCollectionsQuery,
  useLazyGetCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation
} = collectionApi;

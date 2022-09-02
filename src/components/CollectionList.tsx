import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCollectionsQuery } from '../api/collection';
import CollectionCard from './CollectionCard';
import HandleLoadingAndError from './HandleLoadingAndError';

const CollectionList: React.FC = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } = useGetCollectionsQuery(+userId!);

  return (
    <HandleLoadingAndError
      isLoading={isLoading}
      isError={isError}
    >
      <div
        style={{
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}
      >
        {
          data?.map((collection) => (
            <CollectionCard collection={collection} key={collection.id} />
          ))
        }
      </div>
    </HandleLoadingAndError>
  );
}

export default CollectionList;

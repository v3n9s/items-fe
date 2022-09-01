import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useGetCollectionsQuery } from '../api/collection';
import { useGetUserQuery } from '../api/user';
import CollectionCard from './CollectionCard';
import HandleLoadingAndError from './HandleLoadingAndError';

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const user = useGetUserQuery(+userId!);

  const collections = useGetCollectionsQuery(+userId!);

  const { t } = useTranslation();

  return (
    <Container>
      <HandleLoadingAndError
        isLoading={user.isLoading}
        isError={user.isError}
      >
        <div
          style={{
            marginTop: 10
          }}
        >
          <h2>{`${t('users.user')}: ${user.data?.name}`}</h2>
        </div>
      </HandleLoadingAndError>
      <HandleLoadingAndError
        isLoading={collections.isLoading}
        isError={collections.isError}
      >
        <div>
          <h2>{t('collections.collections')}:</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}
        >
          {
            collections.data?.map((collection) => (
              <CollectionCard collection={collection} key={collection.id} />
            ))
          }
        </div>
      </HandleLoadingAndError>
    </Container>
  );
}

export default UserPage;

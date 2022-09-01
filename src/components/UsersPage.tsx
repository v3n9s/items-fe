import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import { useGetUsersQuery } from '../api/user';
import HandleLoadingAndError from './HandleLoadingAndError';
import UserCard from './UserCard';

const UsersPage: React.FC = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  const { t } = useTranslation();

  return (
    <Container>
      <div
        style={{
          marginTop: 10
        }}
      >
        <h2>{t('users.users')}</h2>
      </div>
      <HandleLoadingAndError
        isLoading={isLoading}
        isError={isError}
      >
        <div
          style={{
            marginTop: 10,
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {
            data?.map((user) => (
              <UserCard user={user} key={user.id} />
            ))
          }
        </div>
      </HandleLoadingAndError>
    </Container>
  );
}

export default UsersPage;

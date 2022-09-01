import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'reactstrap';
import { useGetUsersQuery } from '../api/user';
import HandleLoadingAndError from './HandleLoadingAndError';
import User from './User';

const Users: React.FC = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  const { t } = useTranslation();

  return (
    <Container>
      <Row
        style={{
          marginTop: 10
        }}
      >
        <h2
          style={{
            paddingLeft: 0
          }}
        >{t('users.users')}</h2>
      </Row>
      <HandleLoadingAndError
        isLoading={isLoading}
        isError={isError}
      >
        <Row
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
              <User user={user} key={user.id} />
            ))
          }
        </Row>
      </HandleLoadingAndError>
    </Container>
  );
}

export default Users;

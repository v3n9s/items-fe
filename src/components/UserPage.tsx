import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { useGetUserQuery } from '../api/user';
import HandleLoadingAndError from './HandleLoadingAndError';

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const { data, isLoading, isError } = useGetUserQuery(+userId!);

  const { t } = useTranslation();

  return (
    <Container>
      <HandleLoadingAndError
        isLoading={isLoading}
        isError={isError}
      >
        <Row
          style={{
            marginTop: 10
          }}
        >
          <h2
            style={{
              paddingLeft: 0
            }}
          >{`${t('users.user')}: ${data?.name}`}</h2>
        </Row>
      </HandleLoadingAndError>
    </Container>
  );
}

export default UserPage;

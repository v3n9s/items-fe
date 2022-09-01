import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, Row, Spinner } from 'reactstrap';
import { useGetUserQuery } from '../api/user';
import SomethingWentWrong from './SomethingWentWrong';

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const { data, isLoading, isSuccess } = useGetUserQuery(+userId!);

  const { t } = useTranslation();

  return (
    <Container>
      {
        isLoading
          ? <Spinner />
          : isSuccess
            ? (
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
            )
            : <SomethingWentWrong />
      }
    </Container>
  );
}

export default UserPage;

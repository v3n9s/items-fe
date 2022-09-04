import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useGetUserQuery } from '../../api/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { canManipulateSelectorCreator } from '../../store/authSlice';
import { resetValues, toggleIsOpen } from '../../store/collectionModalSlice';
import CollectionList from '../collection/CollectionList';
import HandleLoadingAndError from '../wrappers/HandleLoadingAndError';

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    dispatch(toggleIsOpen(true));
    dispatch(resetValues());
  }, []);

  const canManipulate = useAppSelector(canManipulateSelectorCreator(+userId!));

  const { isLoading, isError, data } = useGetUserQuery(+userId!);

  const { t } = useTranslation();

  return (
    <Container>
      <HandleLoadingAndError
        isLoading={isLoading}
        isError={isError}
      >
        <div
          style={{
            marginTop: 10
          }}
        >
          <h2>{`${t('users.user')}: ${data?.name}`}</h2>
        </div>
      </HandleLoadingAndError>
      <div>
        <h2>{t('collections.collections')}:</h2>
      </div>
      {
        canManipulate && (
          <div className='text-end mb-2'>
            <Button
              onClick={openModal}
            >{t('common.create')}</Button>
          </div>
        )
      }
      <CollectionList />
    </Container>
  );
}

export default UserPage;

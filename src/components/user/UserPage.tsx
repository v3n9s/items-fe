import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useGetUserQuery } from '../../api/user';
import { useAppSelector } from '../../hooks';
import { canManipulateSelectorCreator } from '../../store/authSlice';
import CollectionList from '../collection/CollectionList';
import CollectionModal from '../collection/CollectionModal';
import HandleLoadingAndError from '../wrappers/HandleLoadingAndError';

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const canManipulate = useAppSelector(canManipulateSelectorCreator(+userId!));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleIsModalOpen = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const { isLoading, isError, data } = useGetUserQuery(+userId!);

  const { t } = useTranslation();

  return (
    <>
      <CollectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
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
                onClick={toggleIsModalOpen}
              >{t('common.create')}</Button>
            </div>
          )
        }
        <CollectionList />
      </Container>
    </>
  );
}

export default UserPage;

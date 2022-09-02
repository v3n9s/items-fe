import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useGetCollectionsQuery } from '../api/collection';
import { useGetUserQuery } from '../api/user';
import { useAppSelector } from '../hooks';
import { canManipulateSelectorCreator } from '../store/authSlice';
import CollectionCard from './CollectionCard';
import CollectionModal from './CollectionModal';
import HandleLoadingAndError from './HandleLoadingAndError';

const UserPage: React.FC = () => {
  const { userId } = useParams();

  const canManipulate = useAppSelector(canManipulateSelectorCreator(+userId!));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleIsModalOpen = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const user = useGetUserQuery(+userId!);

  const collections = useGetCollectionsQuery(+userId!);

  const { t } = useTranslation();

  return (
    <>
      <CollectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
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
          {
            canManipulate && (
              <div className='text-end mb-2'>
                <Button
                  onClick={toggleIsModalOpen}
                >{t('modal.create')}</Button>
              </div>
            )
          }
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
    </>
  );
}

export default UserPage;

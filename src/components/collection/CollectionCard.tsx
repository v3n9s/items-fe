import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { useDeleteCollectionMutation } from '../../api/collection';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { canManipulateSelectorCreator } from '../../store/authSlice';
import { setValues, toggleIsOpen } from '../../store/collectionModalSlice';
import { Collection } from '../../types/collection';
import ButtonWithLoading from '../common/ButtonWithLoading';

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    dispatch(toggleIsOpen(true));
    dispatch(setValues({...collection}));
  }, [collection]);

  const { userId } = useParams();

  const canManipulate = useAppSelector(canManipulateSelectorCreator(+userId!));

  const [deleteCollection, deleteQuery] = useDeleteCollectionMutation();

  const deleteCollectionCallback = useCallback(() => {
    deleteCollection({
      userId: +userId!,
      id: collection.id
    });
  }, []);

  return (
    <Card>
      <CardBody
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16
        }}
      >
        <div
          style={{
            flexGrow: 1,
            wordBreak: 'break-all'
          }}
        >
          <CardTitle tag={'h4'}>{collection.name}</CardTitle>
          <CardText>{collection.description}</CardText>
        </div>
        {
          canManipulate && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              <ButtonWithLoading
                color='warning'
                onClick={openModal}
                isLoading={false}
              >
                {t('common.update')}
              </ButtonWithLoading>
              <ButtonWithLoading
                color='danger'
                onClick={deleteCollectionCallback}
                isLoading={deleteQuery.isLoading}
              >
                {t('common.delete')}
              </ButtonWithLoading>
            </div>
          )
        }
      </CardBody>
    </Card>
  );
}

export default CollectionCard;

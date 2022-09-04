import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomForm, { Field } from '../wrappers/CustomForm';
import CustomModal from '../wrappers/CustomModal';
import {
  useCreateCollectionMutation,
  useUpdateCollectionMutation
} from '../../api/collection';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ButtonWithLoading from '../common/ButtonWithLoading';
import { Button } from 'reactstrap';
import { modalActionSelector, toggleIsOpen } from '../../store/collectionModalSlice';
import { matchPath, useLocation } from 'react-router-dom';
import routes from '../../routes';
// TODO get userId
const CollectionModal: React.FC = () => {
  const { t } = useTranslation();
  
  const location = useLocation();

  const path = matchPath(routes.user.path, location.pathname);

  const dispatch = useAppDispatch();

  const modalState = useAppSelector((state) => state.collectionModal);

  const modalAction = useAppSelector(modalActionSelector);

  const hideModal = useCallback(() => {
    dispatch(toggleIsOpen(false));
  }, []);

  const [
    createCollection,
    {
      isLoading: isCreateCollectionLoading
    }
  ] = useCreateCollectionMutation();

  const [
    updateCollection,
    {
      isLoading: isUpdateCollectionLoading
    }
  ] = useUpdateCollectionMutation();

  const isLoading = isCreateCollectionLoading || isUpdateCollectionLoading;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: modalState.values,
    validationSchema: yup.object({
      name: yup
        .string()
        .required()
        .min(3),
      description: yup
        .string()
        .required()
        .min(3)
    }),
    onSubmit: (values, helpers) => {
      const query = values.id
        ? updateCollection({
            id: values.id,
            name: values.name,
            description: values.description,
            userId: +path?.params.userId!
          })
        : createCollection({
            name: values.name,
            description: values.description
          });
      query
        .unwrap()
        .then(() => {
          hideModal();
          helpers.resetForm();
        })
        .catch(() => {});
    }
  });

  const fields: Field[] = [
    {
      label: t('fields.name'),
      name: 'name',
      type: 'text'
    },
    {
      label: t('fields.description'),
      name: 'description',
      type: 'text'
    }
  ];

  return (
    <CustomModal
      title='Create collection'
      isOpen={modalState.isOpen}
      bodyChildren={
        <CustomForm
          isLoading={isLoading}
          formik={formik}
          fields={fields}
        />
      }
      footerChildren={
        <>
          <ButtonWithLoading
            color='primary'
            isLoading={isLoading}
            disabled={!formik.dirty}
            onClick={formik.submitForm}
          >
            {t(`common.${modalAction}`)}
          </ButtonWithLoading>
          <Button
            onClick={hideModal}
          >{t('common.cancel')}</Button>
        </>
      }
    />
  );
}

export default CollectionModal;

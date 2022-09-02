import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateCollectionMutation } from '../../api/collection';
import CustomForm, { Field } from '../wrappers/CustomForm';
import CustomModal from '../wrappers/CustomModal';

interface CollectionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  setIsOpen
}) => {
  const [createCollection, { isLoading }] = useCreateCollectionMutation();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
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
      createCollection(values)
        .unwrap()
        .then(() => {
          helpers.resetForm();
          setIsOpen(false);
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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={isLoading}
      formik={formik}
    >
      <CustomForm
        isLoading={isLoading}
        formik={formik}
        fields={fields}
      />
    </CustomModal>
  );
}

export default CollectionModal;

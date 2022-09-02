import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { useLoginUserMutation } from '../../api/auth';
import CustomForm, { Field } from '../wrappers/CustomForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';

const LoginPage: React.FC = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required()
        .min(3),
      password: yup
        .string()
        .required()
        .min(3)
    }),
    onSubmit: (fields) => {
      loginUser(fields)
        .unwrap()
        .then(() => {
          navigate(routes.home.path);
        })
        .catch(() => {});
    }
  });

  const fields: Field[] = [
    {
      label: t('auth.name'),
      name: 'name',
      type: 'text'
    },
    {
      label: t('auth.password'),
      name: 'password',
      type: 'password'
    }
  ];

  return (
    <CustomForm
      isLoading={isLoading}
      formik={formik}
      fields={fields}
      buttonText={t('auth.login')}
      style={{
        maxWidth: 425,
        marginTop: 8
      }}
    />
  );
};

export default LoginPage;

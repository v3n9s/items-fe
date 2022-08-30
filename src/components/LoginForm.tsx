import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { useLoginUserMutation } from '../api/auth';
import AuthForm, { Field } from './AuthForm';
import { useTranslation } from 'react-i18next';

const LoginForm: React.FC = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { t } = useTranslation();

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
      loginUser(fields);
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
    <AuthForm
      isLoading={isLoading}
      formik={formik}
      fields={fields}
      buttonText={t('auth.login')}
    />
  );
};

export default LoginForm;

import { useFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import { useRegisterUserMutation } from '../api/auth';
import AuthForm, { Field } from './AuthForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';

const RegisterForm: React.FC = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required()
        .min(3),
      password: yup
        .string()
        .required()
        .min(3),
      repeatPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], t('auth.passwordsMustMatch'))
    }),
    onSubmit: (fields) => {
      registerUser({
        name: fields.name,
        password: fields.password
      }).unwrap()
        .then(() => {
          navigate(routes.login.path);
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
    },
    {
      label: t('auth.repeatPassword'),
      name: 'repeatPassword',
      type: 'password'
    }
  ];

  return (
    <AuthForm
      isLoading={isLoading}
      formik={formik}
      fields={fields}
      buttonText={t('auth.register')}
    />
  );
};

export default RegisterForm;

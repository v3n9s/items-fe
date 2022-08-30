import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { InputType } from 'reactstrap/types/lib/Input';

export interface Field {
  label: string;
  name: string;
  type: InputType;
}

interface AuthFormProps {
  isLoading: boolean;
  formik: ReturnType<typeof useFormik<any>>;
  fields: Field[];
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLoading = false,
  formik,
  fields,
  buttonText
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    formik.validateForm();
  }, [t]);

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className='container-sm mt-2'
      style={{
        maxWidth: 425
      }}
    >
      {
        fields.map(({ label, name, type }) => (
          <FormGroup
            key={name}
            className='position-relative'
          >
            <Label>{label}</Label>
            <Input
              name={name}
              type={type}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={!!formik.touched[name] && !!formik.errors[name]}
            />
            <FormFeedback tooltip>
              {formik.errors[name] as string}
            </FormFeedback>
          </FormGroup>
        ))
      }
      <Button
        type='submit'
        disabled={isLoading}
      >
        {buttonText}
        {isLoading && <Spinner className='ms-2' type='border' size='sm' />}
      </Button>
    </Form>
  );
};

export default AuthForm;

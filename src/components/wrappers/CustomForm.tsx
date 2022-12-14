import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { InputType } from 'reactstrap/types/lib/Input';
import ButtonWithLoading from '../common/ButtonWithLoading';

export interface Field {
  label: string;
  name: string;
  type: InputType;
}

interface CustomFormProps {
  isLoading: boolean;
  formik: ReturnType<typeof useFormik<any>>;
  fields: Field[];
  buttonText?: string | undefined;
  style?: React.CSSProperties;
}

const CustomForm: React.FC<CustomFormProps> = ({
  isLoading = false,
  formik,
  fields,
  buttonText,
  style
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    formik.validateForm();
  }, [t]);

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className='container-sm'
      style={style}
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
              disabled={isLoading}
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
      {buttonText && (
        <ButtonWithLoading
          type='submit'
          isLoading={isLoading}
        >
          {buttonText}
        </ButtonWithLoading>
      )}
    </Form>
  );
};

export default CustomForm;

import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ButtonWithLoading from '../common/ButtonWithLoading';

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  formik: ReturnType<typeof useFormik<any>>;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  isOpen,
  setIsOpen,
  isLoading,
  formik
}) => {
  const { t } = useTranslation();

  const toggleIsModalOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <ButtonWithLoading
          color='primary'
          onClick={formik.submitForm}
          isLoading={isLoading}
        >
          {t('common.create')}
        </ButtonWithLoading>
        <Button
          onClick={toggleIsModalOpen}
          disabled={isLoading}
        >
          {t('common.cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;

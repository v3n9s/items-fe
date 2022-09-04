import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  bodyChildren: React.ReactNode;
  footerChildren: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  bodyChildren,
  footerChildren
}) => {
  return (
    <Modal
      isOpen={isOpen}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{bodyChildren}</ModalBody>
      <ModalFooter>{footerChildren}</ModalFooter>
    </Modal>
  );
}

export default CustomModal;

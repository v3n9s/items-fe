import React from 'react';
import { Button, ButtonProps, Spinner } from 'reactstrap';

interface ButtonWithLoadingProps extends ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button
      disabled={isLoading}
      {...props}
    >
      {children}
      {isLoading && <Spinner className='ms-2' type='border' size='sm' />}
    </Button>
  );
}

export default ButtonWithLoading;

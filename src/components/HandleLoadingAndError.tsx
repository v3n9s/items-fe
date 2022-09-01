import React from 'react';
import { Spinner } from 'reactstrap';
import SomethingWentWrong from './SomethingWentWrong';

interface HandleLoadingAndErrorProps {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
}

const HandleLoadingAndError: React.FC<HandleLoadingAndErrorProps> = ({
  isLoading,
  isError,
  children
}) => {
  return (
    <>
      {
        isLoading ? (
          <Spinner />
        ) : isError ? (
          <SomethingWentWrong />
        ) : children
      }
    </>
  );
}

export default HandleLoadingAndError;

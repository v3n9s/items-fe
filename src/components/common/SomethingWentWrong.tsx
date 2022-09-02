import React from 'react';
import { useTranslation } from 'react-i18next';

const SomethingWentWrong: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {t('utils.somethingWentWrong')}
    </>
  );
}

export default SomethingWentWrong;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Container } from 'reactstrap';
import { useAppSelector } from '../hooks';

const Alerts: React.FC = () => {
  const alerts = useAppSelector((state) => state.alerts);

  const { t } = useTranslation();

  return (
    <Container
      fluid
      style={{
        position: 'fixed',
        top: 10,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 10,
        alignItems: 'center',
        width: '100%',
        pointerEvents: 'none'
      }}
    >
      {
        alerts.map(({ id, message, tOptions, ...alert }) => (
          <Alert
            {...alert}
            key={id}
            style={{
              textAlign: 'center',
              margin: 0
            }}
          >{t(message, tOptions)}</Alert>
        ))
      }
    </Container>
  );
}

export default Alerts;

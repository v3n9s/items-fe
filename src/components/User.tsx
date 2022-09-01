import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { User } from '../types/user';

interface UserProps {
  user: User;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <Card
      style={{
        flexBasis: 150,
        flexGrow: 1
      }}
    >
      <CardBody
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          wordBreak: 'break-all'
        }}
      >
        {user.name}
      </CardBody>
    </Card>
  );
}

export default User;

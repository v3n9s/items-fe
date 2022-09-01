import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import routes from '../routes';
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
      tag={Link}
      to={routes.user.createUrl(user.id)}
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

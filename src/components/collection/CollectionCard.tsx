import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { Collection } from '../../types/collection';

interface CollectionCardProps {
  collection: Collection;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection
}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag={'h4'}>{collection.name}</CardTitle>
        <CardText>{collection.description}</CardText>
      </CardBody>
    </Card>
  );
}

export default CollectionCard;

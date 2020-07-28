import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './CollectionCardStyles';

export interface CollectionCardProps {
  backgroundImage: string;
  label: string;
  url: string;
}

export const CollectionCard: FC<CollectionCardProps> = (props) => {
  return (
    <Link to={props.url}>
      <Container bgImg={props.backgroundImage}>
        <h3>{props.label}</h3>
      </Container>
    </Link>
  );
};

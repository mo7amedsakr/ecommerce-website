import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useNumberFormat } from '../../hooks/useNumberFormat';
import {
  ProductContainer,
  CollectionContainer,
  Img,
  Name,
  Price,
} from './CardStyles';

export interface ProductCardProps {
  url: string;
  img: string;
  name: string;
  price: number;
}

export interface CollectionCardProps {
  backgroundImage: string;
  label: string;
  url: string;
}

const Product: FC<ProductCardProps> = (props) => {
  return (
    <div>
      <ProductContainer to={props.url}>
        <Img>
          <img src={props.img} alt="" />
        </Img>
        <Name>{props.name}</Name>
        <Price>{useNumberFormat(props.price)}</Price>
      </ProductContainer>
    </div>
  );
};

const Collection: FC<CollectionCardProps> = (props) => {
  return (
    <Link to={props.url}>
      <CollectionContainer bgImg={props.backgroundImage}>
        <h3>{props.label}</h3>
      </CollectionContainer>
    </Link>
  );
};

export const Card = {
  Product,
  Collection,
};

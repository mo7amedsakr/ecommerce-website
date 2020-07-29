import React, { FC, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNumberFormat } from '../../hooks/useNumberFormat';
import {
  ProductContainer,
  CollectionContainer,
  Img,
  Name,
  Price,
  CartCardContainer,
  CartDetails,
  CartProduct,
  CartInfo,
  InfoItem,
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

export interface CartCardProps {
  img: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  maxQuantity: number;
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

const Cart: FC<CartCardProps> = (props) => {
  const [total, setTotal] = useState(props.quantity * props.price);

  const quantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1 && e.target.value !== '') {
      e.target.value = '1';
    } else if (+e.target.value > props.maxQuantity) {
      e.target.value = props.maxQuantity.toString();
    }
    setTotal(+e.target.value * props.price);
  };

  return (
    <CartCardContainer>
      <CartProduct>
        <Img>
          <img src={props.img} alt="" />
        </Img>
        <CartDetails>
          <Name>{props.name}</Name>
          <span>
            {props.color} / {props.size}
          </span>
          <button>Remove</button>
        </CartDetails>
      </CartProduct>
      <CartInfo>
        <InfoItem>
          <span>Price</span>
          <span>{useNumberFormat(props.price)}</span>
        </InfoItem>
        <InfoItem>
          <span>Quantity</span>

          <input
            type="number"
            min="1"
            max={props.maxQuantity}
            defaultValue={props.quantity}
            onChange={quantityChangeHandler}
          />
        </InfoItem>
        <InfoItem>
          <span>Total</span>

          <span>{useNumberFormat(total)}</span>
        </InfoItem>
      </CartInfo>
    </CartCardContainer>
  );
};

export const Card = {
  Product,
  Collection,
  Cart,
};

import React, { FC, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, ICartItem } from '../../context/Cart';

import { numberFormat } from '../../utils/numberFormat';
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

export interface CartCardProps extends ICartItem {
  index: number;
}

const Product: FC<ProductCardProps> = (props) => {
  return (
    <div>
      <ProductContainer to={props.url}>
        <Img>
          <img src={props.img} alt="" />
        </Img>
        <Name>{props.name}</Name>
        <Price>{numberFormat(props.price)}</Price>
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

const Cart: FC<CartCardProps> = ({
  id,
  name,
  image,
  color,
  maxquantity,
  price,
  quantity,
  size,
  index,
}) => {
  const total = quantity * +price;
  const { removeFromCart, isLoading, updateCartItem } = useContext(CartContext);

  const quantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1 && e.target.value !== '') {
      e.target.value = '1';
    } else if (+e.target.value > maxquantity) {
      e.target.value = maxquantity.toString();
    }
    updateCartItem(id, index, { quantity: +e.target.value });
  };

  return (
    <CartCardContainer>
      <CartProduct>
        <Img>
          <img src={image} alt="" />
        </Img>
        <CartDetails>
          <Name>{name}</Name>
          <span>
            {color} / {size}
          </span>
          <button onClick={() => removeFromCart(id)} disabled={isLoading}>
            Remove
          </button>
        </CartDetails>
      </CartProduct>
      <CartInfo>
        <InfoItem>
          <span>Price</span>
          <span>{numberFormat(+price)}</span>
        </InfoItem>
        <InfoItem>
          <span>Quantity</span>

          <input
            type="number"
            min="1"
            max={maxquantity}
            defaultValue={quantity}
            onChange={quantityChangeHandler}
            disabled={isLoading}
          />
        </InfoItem>
        <InfoItem>
          <span>Total</span>

          <span>{numberFormat(total)}</span>
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

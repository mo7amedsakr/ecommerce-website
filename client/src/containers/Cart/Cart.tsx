import React, { FC } from 'react';
import { useNumberFormat } from '../../hooks/useNumberFormat';
import { Container, Products, Tabel, Footer, Actions } from './CartStyle';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import photo from '../../assets/SGT-Beanie_Navy_01_2048x.jpg';

export interface CartProps {}

export const Cart: FC<CartProps> = (props) => {
  return (
    <Container>
      <Products>
        <Tabel>
          <span>product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </Tabel>
        {new Array(6).fill(0).map((_, i) => (
          <Card.Cart
            key={i}
            color="black"
            size="m"
            maxQuantity={10}
            name="lorem"
            img={photo}
            price={1555}
            quantity={1}
          />
        ))}
      </Products>
      <Footer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ marginBottom: '1rem' }}>
            Special instructions for seller
          </span>
          <textarea></textarea>
        </div>
        <Actions>
          <h3>Subtotal {useNumberFormat(1555)}</h3>
          <span style={{ fontStyle: 'italic', textAlign: 'right' }}>
            Taxes and shipping calculated at checkout
          </span>
          <Button.Border>Continue shopping</Button.Border>
          <Button.Full>check out</Button.Full>
        </Actions>
      </Footer>
    </Container>
  );
};

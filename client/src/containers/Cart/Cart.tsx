import React, { FC, useContext, useEffect } from 'react';
import { numberFormat } from '../../utils/numberFormat';
import { Container, Products, Tabel, Footer, Actions } from './CartStyle';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { AuthContext } from '../../context/Auth';
import { CartContext } from '../../context/Cart';
import { useHistory } from 'react-router-dom';

export interface CartProps {}

export const Cart: FC<CartProps> = (props) => {
  const { user, authLodaing } = useContext(AuthContext);
  const { cart, getCart } = useContext(CartContext);
  const { goBack, push } = useHistory();

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [getCart, user]);

  if (!user) {
    return (
      <Container>
        <h1 style={{ textAlign: 'center' }}>
          {authLodaing ? 'Loading...' : 'Please login first.'}
        </h1>
      </Container>
    );
  }

  const toCheckout = () => push('/checkout');

  return (
    <Container>
      <Products>
        <Tabel>
          <span>product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </Tabel>
        {cart.items.map((item, i) => (
          <Card.Cart key={item.id} index={i} {...item} />
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
          <h3>Subtotal {numberFormat(cart.total)}</h3>
          <span style={{ fontStyle: 'italic', textAlign: 'right' }}>
            Taxes and shipping calculated at checkout
          </span>
          <Button.Border onClick={goBack}>Continue shopping</Button.Border>
          <Button.Full disabled={cart.length < 1} onClick={toCheckout}>
            check out
          </Button.Full>
        </Actions>
      </Footer>
    </Container>
  );
};

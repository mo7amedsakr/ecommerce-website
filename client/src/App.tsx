import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import { Home } from './containers/Home/Home';
import { Product } from './containers/Product/Product';
import { Cart } from './containers/Cart/Cart';
import { Products } from './components/Products/Products';
import Checkout from './containers/Checkout/Checkout';
import { CheckoutProvider } from './context/Checkout';
import { Alert } from './components/Alert/Alert';

function App() {
  const { pathname } = useLocation();

  let render = (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:slug">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/:collection">
          <Products />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Layout>
  );

  if (pathname === '/checkout') {
    render = (
      <CheckoutProvider>
        <Checkout />
      </CheckoutProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {render}
      <Alert />
    </ThemeProvider>
  );
}

export default App;

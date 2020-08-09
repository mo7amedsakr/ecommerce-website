import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import { Home } from './containers/Home/Home';
import { Product } from './containers/Product/Product';
import { Cart } from './containers/Cart/Cart';
import { Auth } from './containers/Auth/Auth';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Switch>
        <Route path="/login">
          <Auth.Login />
        </Route>
        <Route path="/signup">
          <Auth.Signup />
        </Route>

        <Layout>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:slug">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Layout>
      </Switch>
    </ThemeProvider>
  );
}

export default App;

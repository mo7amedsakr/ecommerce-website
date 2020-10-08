import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import { Home } from './containers/Home/Home';
import { Product } from './containers/Product/Product';
import { Cart } from './containers/Cart/Cart';
import { Products } from './components/Products/Products';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
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
          <Route path="/accessories">
            <Products />
          </Route>
          <Route path="/footwear">
            <Products />
          </Route>
          <Route path="/pants">
            <Products />
          </Route>
          <Route path="/tshirts">
            <Products />
          </Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

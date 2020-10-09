import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { theme } from './theme';
import { Home } from './containers/Home/Home';
import { Product } from './containers/Product/Product';
import { Cart } from './containers/Cart/Cart';
import { Products } from './components/Products/Products';
import { AuthContext } from './context/Auth';

function App() {
  const { getMe } = useContext(AuthContext);

  useEffect(() => {
    getMe();
  }, [getMe]);

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
          <Redirect to="/" />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

import React, { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ProductsContext } from '../../context/Products';
import { Card } from '../../components/Card/Card';
import { useLocation } from 'react-router-dom';

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-auto-flow: row;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export interface ProductsProps {}

export const Products: FC<ProductsProps> = (props) => {
  const { pathname } = useLocation();

  const { products, getProducts } = useContext(ProductsContext);

  useEffect(() => {
    if (!products[pathname]) {
      getProducts(pathname);
    }
  }, [products, getProducts, pathname]);

  return (
    <Cards>
      {products[pathname] ? (
        products[pathname].map((product) => (
          <Card.Product
            key={product.id}
            url={`/products/${product.slug}`}
            img={product.images[0]}
            name={product.name}
            price={+product.price}
          />
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </Cards>
  );
};

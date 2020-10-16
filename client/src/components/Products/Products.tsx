import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ProductsContext } from '../../context/Products';
import { Card } from '../../components/Card/Card';
import { useParams } from 'react-router-dom';

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
  const firstRender = useRef(true);
  const loader = useRef<HTMLHeadingElement>(null);
  const { collection } = useParams<{ collection: string }>();
  const { products, getProducts } = useContext(ProductsContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts(collection, 1);
    setPage(1);
  }, [collection, getProducts]);

  useEffect(() => {
    if (page > 1) {
      getProducts(collection, page);
    }
  }, [collection, page, getProducts]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return (
    <>
      <Cards>
        {products.map((product) => (
          <Card.Product
            key={product.id}
            url={`/products/${product.slug}`}
            img={product.images[0]}
            name={product.name}
            price={+product.price}
          />
        ))}
      </Cards>
      <h2 style={{ textAlign: 'center', marginTop: '5rem' }} ref={loader}>
        Loading...
      </h2>
    </>
  );
};

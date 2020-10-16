import React, { FC, useRef, useContext, useEffect } from 'react';
import { numberFormat } from '../../utils/numberFormat';
import {
  Container,
  Main,
  Details,
  Selectors,
  Description,
} from './ProductStyle';
import { ImagesViewer } from '../../components/ImagesViewer/ImagesViewer';
import { Select } from '../../components/Select/Select';
import { Button } from '../../components/Button/Button';
// import { Recommendation } from '../../components/Recommendation/Recommendation';
// import { Card } from '../../components/Card/Card';
import { ProductsContext } from '../../context/Products';
import { ErrorContext } from '../../context/Error';
import { CartContext } from '../../context/Cart';
import { useParams } from 'react-router-dom';

export interface ProductProps {}

export const Product: FC<ProductProps> = (props) => {
  const colorRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { getProduct, product, isLoading } = useContext(ProductsContext);
  const { error } = useContext(ErrorContext);
  const { addToCart, isLoading: cartLoading } = useContext(CartContext);

  useEffect(() => {
    getProduct(slug);
  }, [slug, getProduct]);

  if (isLoading) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <h1>{error}</h1>
      </Container>
    );
  }

  const addToCartHandler = () => {
    addToCart({
      productId: product.id,
      color: colorRef.current!.value,
      size: sizeRef.current!.value,
      quantity: 1,
    });
  };

  return (
    <>
      <Container>
        <Main>
          <ImagesViewer images={product.images} />
          <Details>
            <h3>{product.name}</h3>
            <h4>{numberFormat(+product.price)}</h4>

            <Selectors>
              <Select label="color" options={product.colors} ref={colorRef} />
              <Select label="size" options={product.sizes} ref={sizeRef} />
            </Selectors>
            <Button.Border onClick={addToCartHandler} disabled={cartLoading}>
              {cartLoading ? 'Loading...' : 'add to cart'}
            </Button.Border>
            {/* <Button.Full>but it now</Button.Full> */}
          </Details>
        </Main>
        <Description>
          <p>{product.description}</p>
        </Description>
      </Container>
      {/* <Recommendation label="Lorem ipsum dolor sit amet.">
        {new Array(4).fill(0).map((_, i) => (
          <Card.Product
            key={i}
            url={`/products/slug`}
            img={photo}
            name="Lorem, ipsum dolor."
            price={1555}
          />
        ))}
      </Recommendation> */}
    </>
  );
};

import React, { FC } from 'react';
import { Container, Cards } from './HomeStyles';
import { Card } from '../../components/Card/Card';
import { Recommendation } from '../../components/Recommendation/Recommendation';

import photo from '../../assets/SGT-Beanie_Navy_01_2048x.jpg';

export interface HomeProps {}

export const Home: FC<HomeProps> = (props) => {
  const collections = [
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
    { img: photo, label: 'Accessories', url: '/' },
  ];
  return (
    <>
      <Container>
        <Cards>
          {new Array(10).fill(0).map((_, i) => (
            <Card.Product
              key={i}
              url={`/products/slug`}
              img={photo}
              name="Lorem, ipsum dolor."
              price={1555}
            />
          ))}
        </Cards>
      </Container>
      <Recommendation label="Lorem ipsum dolor sit amet.">
        {collections.map((el, i) => (
          <Card.Collection
            key={i}
            backgroundImage={el.img}
            label={el.label}
            url={el.url}
          />
        ))}
      </Recommendation>
    </>
  );
};

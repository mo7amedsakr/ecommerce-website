import React, { FC } from 'react';
import { Container } from './HomeStyles';
import { Card } from '../../components/Card/Card';
import { Recommendation } from '../../components/Recommendation/Recommendation';
import { Products } from '../../components/Products/Products';
import Accessories from '../../assets/SGT-Beanie_Navy_01_2048x.jpg';
import Footwear from '../../assets/Boot_03_01_2048x2048.jpg';
import TShirts from '../../assets/SGT-1101BC__Navy_01_2048x2048.jpg';
import Pants from '../../assets/SGT-1171-Olive_Front_S_2048x2048.jpg';

export interface HomeProps {}

const collections = [
  { img: Accessories, label: 'Accessories', url: '/accessories' },
  { img: Footwear, label: 'Footwear', url: '/footwear' },
  { img: TShirts, label: 'T-Shirts', url: '/tshirts' },
  { img: Pants, label: 'Pants', url: '/pants' },
];

export const Home: FC<HomeProps> = (props) => {
  return (
    <>
      <Container>
        <Products />
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

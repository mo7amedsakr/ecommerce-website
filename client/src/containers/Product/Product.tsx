import React, { FC, useRef } from 'react';
import { useNumberFormat } from '../../hooks/useNumberFormat';
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
import { Recommendation } from '../../components/Recommendation/Recommendation';
import { Card } from '../../components/Card/Card';
import photo from '../../assets/SGT-Beanie_Navy_01_2048x.jpg';

import photo1 from '../../assets/SGT-1161-Charcoal_Front_M_2048x2048.jpg';
import photo2 from '../../assets/SGT-1161-Charcoal_Detail_3_2048x2048.jpg';
import photo3 from '../../assets/SGT-1161-Charcoal_Detail_2_2048x2048.jpg';
import photo4 from '../../assets/SGT-1161-Charcoal_Detail_1_2048x2048.jpg';
import photo5 from '../../assets/SGT-1161-Charcoal_Back_2048x2048.jpg';

export interface ProductProps {}

export const Product: FC<ProductProps> = (props) => {
  const colorRef = useRef<HTMLSelectElement>(null);
  const sizeRef = useRef<HTMLSelectElement>(null);

  return (
    <>
      <Container>
        <Main>
          <ImagesViewer images={[photo1, photo2, photo3, photo4, photo5]} />
          <Details>
            <h3>Lorem ipsum dolor sit.</h3>
            <h4>{useNumberFormat(1555)}</h4>

            <Selectors>
              <Select label="color" options={['one']} ref={colorRef} />
              <Select label="size" options={['one', 'two']} ref={sizeRef} />
            </Selectors>
            <Button.Border>add to cart</Button.Border>
            <Button.Full>but it now</Button.Full>
          </Details>
        </Main>
        <Description>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa,
            dolorum?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque,
            sequi magni enim voluptates eaque quia dicta, possimus accusantium
            inventore, pariatur laudantium mollitia facilis amet repudiandae non
            ratione rerum culpa corporis.
          </p>
        </Description>
      </Container>
      <Recommendation label="Lorem ipsum dolor sit amet.">
        {new Array(4).fill(0).map((_, i) => (
          <Card
            key={i}
            url={`/products/slug`}
            img={photo}
            name="Lorem, ipsum dolor."
            price={1555}
          />
        ))}
      </Recommendation>
    </>
  );
};

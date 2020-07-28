import React, { FC } from 'react';

import { useNumberFormat } from '../../hooks/useNumberFormat';
import { Container, Img, Name, Price } from './CardStyles';

export interface CardProps {
  url: string;
  img: string;
  name: string;
  price: number;
}

export const Card: FC<CardProps> = (props) => {
  return (
    <div>
      <Container to={props.url}>
        <Img>
          <img src={props.img} alt="" />
        </Img>
        <Name>{props.name}</Name>
        <Price>{useNumberFormat(props.price)}</Price>
      </Container>
    </div>
  );
};

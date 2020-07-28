import React, { FC, useState } from 'react';
import {
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { useHideScrollbar } from '../../hooks/useHideScrollbar';
import { Container, Close, Img } from './LightboxStyle';

export interface LightboxProps {
  startIndex: number;
  images: string[];
  close: () => void;
}

export const Lightbox: FC<LightboxProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(props.startIndex);
  const length = useState(props.images.length)[0];

  useHideScrollbar();

  const increment = () => setCurrentIndex((prev) => prev + 1);

  const decrement = () => setCurrentIndex((prev) => prev - 1);

  return (
    <Container>
      <Close onClick={props.close}>
        <RiCloseLine size="5rem" />
      </Close>
      <button onClick={increment}>
        <RiArrowLeftSLine size="5rem" />
      </button>
      <Img>
        <img src={props.images[Math.abs(currentIndex) % length]} alt="" />
      </Img>
      <button onClick={decrement}>
        <RiArrowRightSLine size="5rem" />
      </button>
    </Container>
  );
};

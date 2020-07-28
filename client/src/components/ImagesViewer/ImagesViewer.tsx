import React, { FC, useState } from 'react';
import { Container, CurrentImg, Imgs } from './ImagesViewerStyle';
import { Lightbox } from '../Lightbox/Lightbox';

export interface ImagesViewerProps {
  images: string[];
}

export const ImagesViewer: FC<ImagesViewerProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLightbox = () => setIsOpen((prev) => !prev);

  return (
    <Container>
      {isOpen ? (
        <Lightbox
          images={props.images}
          startIndex={currentIndex}
          close={toggleLightbox}
        />
      ) : null}
      <CurrentImg>
        <img src={props.images[currentIndex]} alt="" onClick={toggleLightbox} />
      </CurrentImg>
      <Imgs>
        {props.images.map((img, i) => (
          <img key={i} src={img} alt="" onClick={() => setCurrentIndex(i)} />
        ))}
      </Imgs>
    </Container>
  );
};

import React, { FC, useState } from 'react';
import { Container, CurrentImg, Imgs } from './ImagesViewerStyle';

export interface ImagesViewerProps {
  images: string[];
}

export const ImagesViewer: FC<ImagesViewerProps> = (props) => {
  const [currentImg, setCurrentImg] = useState(props.images[0]);

  return (
    <Container>
      <CurrentImg>
        <img src={currentImg} alt="" />
      </CurrentImg>
      <Imgs>
        {props.images.map((img, i) => (
          <img key={i} src={img} alt="" onClick={() => setCurrentImg(img)} />
        ))}
      </Imgs>
    </Container>
  );
};

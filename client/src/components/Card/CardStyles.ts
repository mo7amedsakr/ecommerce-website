import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductContainer = styled(Link)`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
  * {
    font-weight: ${(props) => props.theme.fontWeight.main};
  }
`;

export const Img = styled.div`
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    transition: all 0.1s;
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const Name = styled.h3``;

export const Price = styled.h4``;

export const CollectionContainer = styled.div<{ bgImg: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  color: white;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url(${(props) => props.bgImg});
`;

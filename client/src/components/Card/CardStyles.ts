import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
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

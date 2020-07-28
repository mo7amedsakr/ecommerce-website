import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
  }
`;

export const CurrentImg = styled.div`
  img {
    @media ${(props) => props.theme.mediaQueries.canHover} {
      cursor: zoom-in;
    }
  }
`;

export const Imgs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  img {
    @media ${(props) => props.theme.mediaQueries.canHover} {
      cursor: pointer;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

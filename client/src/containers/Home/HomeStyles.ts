import styled from 'styled-components';

export const Container = styled.div``;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-auto-flow: row;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

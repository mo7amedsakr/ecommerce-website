import styled from 'styled-components';
import { Container as MUIContainer } from '@material-ui/core';

export const Container = styled(MUIContainer)``;

export const Main = styled.main`
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 16% auto;
  grid-gap: 2rem;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    grid-template-columns: auto;
  }
`;

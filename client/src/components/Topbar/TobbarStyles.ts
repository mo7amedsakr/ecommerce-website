import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    align-items: center;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  border-bottom: ${(props) => props.theme.border};
  width: 100%;
  & > :nth-child(2) {
    margin-left: auto;
    margin-right: 2rem;
  }
`;

export const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  i {
    margin-right: 0.5rem;
  }
`;

export const Logo = styled(RouterLink)`
  font-size: 3.5rem;
  font-weight: ${(props) => props.theme.fontWeight.big};
  margin-top: 2rem;
  text-transform: uppercase;
`;

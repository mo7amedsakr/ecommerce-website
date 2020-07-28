import styled from 'styled-components';
import { Link as RRDLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6rem 0;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: ${(props) => props.theme.border};
  border-bottom: ${(props) => props.theme.border};
  padding: 3rem 0;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.mediaQueries.tablet} {
    flex-direction: column;
    & > :first-child {
      margin-bottom: 2rem;
    }
    & > {
      width: 100%;
    }
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
  & > :first-child {
    margin-bottom: 2rem;
  }
`;

export const Link = styled(RRDLink)`
  transition: all 0.1s;
  &:hover {
    color: ${(props) => props.theme.colors.gray};
  }
`;

export const Right = styled.div`
  & > :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const Bottom = styled.div``;

import styled from 'styled-components';

export const Container = styled.div``;

export const Main = styled.div`
  display: flex;
  & > :first-child {
    width: 50%;
  }
  & > :last-child {
    margin-left: 5rem;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    flex-direction: column;
    & > :first-child {
      width: 100%;
      margin-bottom: 2rem;
    }
    & > :last-child {
      margin-left: 0;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  h3,
  h4 {
    font-weight: ${(props) => props.theme.fontWeight.mid};
  }
  h3 {
    font-size: 3rem;
  }
  h4 {
    font-size: 2rem;
  }
`;

export const Selectors = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 4rem;
  }
`;

export const Description = styled.div`
  margin-top: 6rem;
  & > :first-child {
    margin-bottom: 2rem;
  }
`;

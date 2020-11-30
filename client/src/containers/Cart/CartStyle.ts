import styled from 'styled-components';

export const Container = styled.div``;

export const Products = styled.div``;

export const Tabel = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-weight: ${(props) => props.theme.fontWeight.mid};
  & > :not(:last-child) {
    margin-right: 7rem;
  }
  & > :first-child {
    margin-right: auto;
    margin-left: 2rem;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    display: none;
  }
`;

export const Footer = styled.div`
  border-top: ${(props) => props.theme.border};
  padding-top: 2rem;
  margin-top: 4rem;
  textarea {
    background-color: ${(props) => props.theme.colors.lightGray};
    height: 100%;
    width: 100%;
  }
  display: flex;
  justify-content: space-between;
  & > :first-child {
    width: 50%;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    flex-direction: column;
    & > :first-child {
      width: 100%;
      height: 10rem;
      margin-bottom: 2rem;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & > :not(:last-child) {
    margin-bottom: 2rem;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    align-items: center;
  }
`;

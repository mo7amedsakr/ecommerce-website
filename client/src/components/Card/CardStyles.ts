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
    transition: all 0.2s;
    &:hover {
      /* opacity: 0.9; */
      transform: scale(1.5);
    }
  }
`;

export const Name = styled.h3`
  text-transform: capitalize;
`;

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

export const CartCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CartProduct = styled.div`
  ${Img} {
    width: 15rem;
    margin-right: 1rem;
    @media ${(props) => props.theme.mediaQueries.mobile} {
      width: 20rem;
      margin-right: 0;
    }
  }
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;

export const CartDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    align-items: center;
  }
`;

export const CartInfo = styled.div`
  display: flex;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 4rem;
  }
  input {
    background-color: ${(props) => props.theme.colors.lightGray};
    padding: 1rem;
    width: 6rem;
    height: 4rem;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    margin-top: 2rem;
    flex-direction: column;
    align-items: stretch;
    & > :not(:last-child) {
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`;

export const InfoItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > :first-child {
    display: none;
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    & > :first-child {
      display: block;
    }
  }
`;

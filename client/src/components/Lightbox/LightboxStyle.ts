import styled from 'styled-components';

export const Container = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0 3rem;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    padding: 0;
  }
`;

export const Close = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const Img = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
    max-height: 100%;
  }
`;

import styled from 'styled-components';

export const Container = styled.div<{ bgImg: string }>`
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

import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  text-align: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  & > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

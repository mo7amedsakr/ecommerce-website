import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  input {
    padding: 1rem;
    width: 100%;
    background-color: ${(props) => props.theme.colors.lightGray};
    &::placeholder {
      text-transform: capitalize;
    }
  }
`;

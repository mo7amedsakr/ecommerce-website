import styled from 'styled-components';

const Base = styled.button`
  text-transform: uppercase;
  padding: 1rem 2rem;
`;

export const Button = {
  Full: styled(Base)`
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.darkGray};
    transition: all 0.1s;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }
  `,

  Border: styled(Base)`
    border: 2px solid ${(props) => props.theme.colors.darkGray};
    padding: calc(1rem - 2px) calc(2rem - 2px);
    &:hover {
      opacity: 0.85;
    }
  `,
};

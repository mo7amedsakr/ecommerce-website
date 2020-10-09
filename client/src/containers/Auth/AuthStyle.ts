import styled from 'styled-components';

export const Form = styled.form`
  width: 60rem;
  height: 50vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 5rem;
  & > :not(:last-child) {
    margin-bottom: 2rem;
  }

  @media ${(props) => props.theme.mediaQueries.mobile} {
    width: 90%;
  }
`;

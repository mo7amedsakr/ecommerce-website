import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  /* margin-right: 2rem;
  width: 18rem; */
`;

export const UL = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    /* margin-bottom: 1rem; */
  }
  @media ${(props) => props.theme.mediaQueries.mobile} {
    align-items: center;
  }
`;

export const LI = styled.li`
  text-transform: capitalize;
  border-bottom: ${(props) => props.theme.border};
  padding: 1.5rem 0;
  @media ${(props) => props.theme.mediaQueries.mobile} {
    border-bottom: none;
  }
`;

export const Menu = styled.div`
  border-top: ${(props) => props.theme.border};
  border-bottom: ${(props) => props.theme.border};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const MenuIcon = styled.div`
  div {
    width: 3rem;
    height: 0.5rem;
    background-color: ${(props) => props.theme.colors.black};
    margin-bottom: 0.2rem;
    border-radius: 5rem;
  }
  /* margin-bottom: 1rem; */
`;

export const Socials = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

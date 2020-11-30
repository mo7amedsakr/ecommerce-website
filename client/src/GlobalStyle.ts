import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
  }

  *,
  *::after,
  *::before{
    box-sizing:inherit;
  }

  html{
    box-sizing:border-box;
    font-size:62.5%;
  }

  body{
    font-size:${(props) => props.theme.fontSize.main}rem;
    font-weight:${(props) => props.theme.fontWeight.main};
    font-family:${(props) =>
      `${props.theme.fontFamliy.main}, ${props.theme.fontFamliy.fallBack}`};
  }

  button,input,textarea{
    border: none;
    background-color: transparent;
    color: inherit;
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  button:disabled{
    opacity:0.7;
  }

  a{
    text-decoration:none;
    color: inherit; 
    cursor:none;

  }
  ul{
    list-style:none;
  }

  @media ${(props) => props.theme.mediaQueries.canHover} {
    button,a{
      cursor:pointer;
    }
  }
`;

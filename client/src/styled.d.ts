import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      lightGray: string;
      gray: string;
      darkGray: string;
      backdrop: string;
      alertError: string;
    };

    fontFamliy: { main: string; fallBack: string };

    fontSize: { main: number };

    fontWeight: { main: number; mid: number; big: number };

    mediaQueries: {
      mobile: string;
      tablet: string;
      canHover: string;
    };

    border: string;
  }
}

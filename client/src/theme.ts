import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    lightGray: '#eeeeee',
    gray: '#7f7f7f',
    darkGray: '#212121',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    alertError: 'rgba(155, 0, 0, 0.9)',
  },

  fontFamliy: { main: 'Roboto', fallBack: 'sans-serif' },

  fontSize: { main: 1.6 },

  fontWeight: { main: 400, mid: 500, big: 900 },

  mediaQueries: {
    mobile: '(max-width: 767.98px)',
    tablet: '(max-width: 991.98px)',
    canHover: '(hover: hover) and (pointer: fine)',
  },

  border: '1px solid rgba(0, 0, 0, 0.3)',
};

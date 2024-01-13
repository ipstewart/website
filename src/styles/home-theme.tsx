import { PaletteMode, ThemeOptions } from '@mui/material';

export const getHomeTheme = (mode: PaletteMode): ThemeOptions => ({
  typography: {
    fontFamily: "'Urbanist Variable', sans-serif",
    body1: {
      marginBottom: '12px',
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          background: {
            default: '#FDF5E6',
            paper: '#FFFFFF',
          },
          primary: {
            main: '#606C38',
            light: '#A0B168',
          },
          secondary: {
            main: '#DDA15E',
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: '#040D12',
            paper: '#5C8374',
          },
          primary: {
            main: '#183D3D',
            light: '#328080',
          },
          secondary: {
            main: '#5C8374',
          },
        }),
  },
});

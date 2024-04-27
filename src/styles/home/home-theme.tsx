import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const typography = {
  fontFamily: "'Urbanist Variable', sans-serif",
  body1: {
    marginBottom: '12px',
  },
};

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      background: {
        default: '#FDF5E6',
        paper: '#FFFFFF',
      },
      primary: {
        main: '#606C38',
        light: '#A0B168',
        contrastText: '#FFF',
      },
      secondary: {
        main: '#DDA15E',
      },
      info: {
        main: '#3A86FF',
      },
    },
    typography,
  }),
);

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#040D12',
        paper: '#3B544F',
      },
      primary: {
        main: '#183D3D',
        light: '#328080',
        contrastText: '#FFF',
      },
      secondary: {
        main: '#BBCEC7',
      },
      info: {
        main: '#ECA869',
      },
    },
    typography,
  }),
);

export { lightTheme, darkTheme };

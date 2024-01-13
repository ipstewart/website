import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const survivorTheme = responsiveFontSizes(
  createTheme({
    typography: {
      h1: {
        fontFamily: "'Fredoka Variable', sans-serif",
        fontSize: '45px',
        fontWeight: 600,
      },
      h2: {
        fontFamily: "'Fredoka Variable', sans-serif",
        fontSize: '40px',
        fontWeight: 600,
      },
      h3: {
        fontFamily: "'Fredoka Variable', sans-serif",
        fontSize: '35px',
        fontWeight: 600,
      },
      h4: {
        fontFamily: "'Fredoka Variable', sans-serif",
        fontSize: '30px',
      },
      h5: {
        fontFamily: "'Fredoka Variable', sans-serif",
        fontSize: '25px',
      },
      h6: {
        fontFamily: "'Fredoka Variable', sans-serif",
        fontSize: '16px',
        fontWeight: 400,
      },
      body1: {
        fontFamily: "'Source Code Pro Variable', sans-serif",
      },
      body2: {
        fontFamily: "'Source Code Pro Variable', sans-serif",
      },
    },
    palette: {
      background: {
        default: '#E5FDFF',
        paper: '#FFFFFF',
      },
      primary: {
        main: '#3BA84F',
      },
      secondary: {
        main: '#274775',
      },
    },
  }),
);

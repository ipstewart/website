import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, createContext, useMemo, useState } from 'react';

import { darkTheme, lightTheme } from './home-theme';

export const HomeThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const HomeThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const homeThemeContextValue = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode]);

  return (
    <HomeThemeContext.Provider value={homeThemeContextValue}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </HomeThemeContext.Provider>
  );
};

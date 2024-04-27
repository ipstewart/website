import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, createContext, useMemo, useState } from 'react';

import { lightTheme } from './word-path-theme';

export const WordPathThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const WordPathThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const wordPathThemeContextValue = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode]);

  return (
    <WordPathThemeContext.Provider value={wordPathThemeContextValue}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </WordPathThemeContext.Provider>
  );
};

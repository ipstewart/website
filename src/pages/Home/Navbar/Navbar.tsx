import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { RefObject, useContext } from 'react';

import { HomeThemeContext } from '../../../styles/home/HomeThemeContext';

interface NavbarProps {
  projectsRef: RefObject<HTMLDivElement>;
}

export default function Navbar({ projectsRef }: Readonly<NavbarProps>) {
  const { isDarkMode, toggleTheme } = useContext(HomeThemeContext);

  return (
    <FormGroup>
      <AppBar position="fixed" elevation={0} enableColorOnDark>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className="flex-1 cursor-pointer"
            fontWeight="700"
            aria-label="Homepage"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Ian Stewart
          </Typography>
          <Button
            variant="contained"
            aria-label="Portfolio"
            disableElevation
            sx={{ mr: 2 }}
            onClick={() =>
              projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }>
            PORTFOLIO
          </Button>
          <IconButton aria-label="info" color="secondary" size="medium" onClick={toggleTheme}>
            {isDarkMode ? (
              <LightModeIcon fontSize="inherit" />
            ) : (
              <DarkModeIcon fontSize="inherit" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </FormGroup>
  );
}

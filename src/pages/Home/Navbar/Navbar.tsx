import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { DarkModeSwitch } from './DarkModeSwitch';

export default function Navbar({
  toggleDarkMode,
  projectsRef,
}: Readonly<{ projectsRef: React.RefObject<HTMLDivElement>; toggleDarkMode: () => void }>) {
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
          <DarkModeSwitch onChange={() => toggleDarkMode()} defaultChecked />
        </Toolbar>
      </AppBar>
    </FormGroup>
  );
}

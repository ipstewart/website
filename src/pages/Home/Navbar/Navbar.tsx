import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { DarkModeSwitch } from './DarkModeSwitch';

export default function Navbar({
  toggleDarkMode,
  portfolioRef,
}: Readonly<{ portfolioRef: React.RefObject<HTMLDivElement>; toggleDarkMode: () => void }>) {
  return (
    <FormGroup>
      <AppBar position="fixed" elevation={0} enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" className="flex-1" fontWeight="700">
            Ian Stewart
          </Typography>
          <Button
            variant="contained"
            disableElevation
            sx={{ mr: 2 }}
            onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            My Stuff
          </Button>
          <DarkModeSwitch onChange={() => toggleDarkMode()} defaultChecked />
        </Toolbar>
      </AppBar>
    </FormGroup>
  );
}

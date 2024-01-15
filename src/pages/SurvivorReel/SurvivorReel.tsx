import { ThemeProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { survivorTheme } from '../../styles/survivor-theme';
import BarChart from './BarChart/BarChart';
import DonutChart from './DonutChart/DonutChart';
import SurvivorHero from './SurvivorHero/SurvivorHero';
import styles from './SurvivorReel.module.scss';

function SurvivorReel() {
  const data = [
    {
      name: 'Physical',
      value: 7,
    },
    {
      name: 'Social',
      value: 8,
    },
    {
      name: 'Mental',
      value: 6,
    },
    {
      name: 'Strategic',
      value: 9,
    },
  ];

  const donutData = [30, 40, 20, 10];
  const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2'];

  return (
    <ThemeProvider theme={survivorTheme}>
      <CssBaseline />

      <Container sx={{ minHeight: '100vh' }}>
        <Box className={styles.header}>
          <Box>
            <Typography variant="h3" color="primary">
              Ian Stewart
            </Typography>
            <Typography variant="h6" color="primary">
              For your consideration
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              25 years old
            </Typography>
            <Typography variant="h6" color="primary">
              Washington, DC
            </Typography>
          </Box>
        </Box>

        <SurvivorHero />

        <BarChart data={data} />

        <Box sx={{ height: '600px' }}>
          <DonutChart data={donutData} colors={colors} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SurvivorReel;

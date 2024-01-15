import { ThemeProvider } from '@emotion/react';
import { PaletteMode } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useMemo, useRef, useState } from 'react';

import Scroller from '../../components/Scroller';
import ScrollerCard from '../../components/ScrollerCard';
import ScrollerOverlay from '../../components/ScrollerOverlay';
import { getHomeTheme } from '../../styles/home-theme';
import Footer from '../Footer/Footer';
import Portfolio from '../Portfolio/Portfolio';
import { Carousel } from './Carousel/Carousel';
import styles from './Home.module.scss';
import MapAnimation, { MapAnimationRef } from './MapAnimation/MapAnimation';
import Navbar from './Navbar/Navbar';

function Home() {
  const lottieRef = useRef<MapAnimationRef>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(() => responsiveFontSizes(createTheme(getHomeTheme(mode))), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleDarkMode={colorMode.toggleColorMode} portfolioRef={portfolioRef} />

      <Box className={styles.introContainer}>
        <Avatar
          alt="Ian Stewart"
          src="images/avatar.png"
          sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
        />
        <Typography variant="h5">
          Hi, I&apos;m <b>Ian</b>
        </Typography>
        <Box className={styles.arrowContainer}>
          <div
            className={mode === 'light' ? styles.arrow : `${styles.arrow} ${styles.arrowLight}`}
          />
          <div
            className={mode === 'light' ? styles.arrow : `${styles.arrow} ${styles.arrowLight}`}
          />
          <div
            className={mode === 'light' ? styles.arrow : `${styles.arrow} ${styles.arrowLight}`}
          />
        </Box>
      </Box>

      <Scroller>
        {/* BACKDROPS */}

        <Container data-name="animation" className="h-full">
          <Grid container justifyContent="center" alignItems="center" height="100%">
            <MapAnimation
              src={
                mode === 'light'
                  ? 'animations/map-animation-light.json'
                  : 'animations/map-animation-dark.json'
              }
              ref={lottieRef}
            />
          </Grid>
        </Container>

        <Container data-name="school-images" className="h-full">
          <Grid container justifyContent="center" alignItems="center" height="100%" width="100%">
            <Grid container spacing={2} columns={{ xs: 6, sm: 12 }}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="images/roast.png"
                  className="h-full w-full object-cover"
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="images/crash-test.jpg"
                  className="h-full w-full object-cover"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Container data-name="capabilities" className="h-full">
          <Carousel />
        </Container>

        <Container data-name="survivor-video" className="h-full">
          <Box className="h-full flex flex-col justify-center">
            <Box className="w-full relative" sx={{ paddingBottom: '56.25%' }}>
              <iframe
                className={styles.video}
                src="https://www.youtube.com/embed/BZSm9k2z2_o?si=W86njCKQUUe7y_7V"
                title="Survivor Audition"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </Box>
          </Box>
        </Container>

        {/* OVERLAYS */}

        <ScrollerOverlay
          content="animation"
          onStepProgress={({ progress }) =>
            lottieRef.current?.scrub({ start: 0, end: 12, progress })
          }>
          <ScrollerCard>
            <Typography variant="body1">
              I was born in <b>California</b>, moving around until my family settled in{' '}
              <b>New Jersey</b>, where I grew up.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>

        <ScrollerOverlay
          content="animation"
          onStepProgress={({ progress }) =>
            lottieRef.current?.scrub({ start: 12, end: 15, progress })
          }>
          <ScrollerCard>
            <Typography variant="body1">
              I attended <b>Bowdoin College</b> in <b>Maine</b>, where I graduated in 2020.
            </Typography>
            <Typography variant="body1">
              In 2021, I moved to <b>Washington, DC</b>, where I currently reside.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>

        <ScrollerOverlay content="school-images">
          <ScrollerCard>
            <Typography variant="body1">
              In college I double majored in <b>Computer Science</b> and <b>Theater</b>.
            </Typography>
            <Typography variant="body1">
              I conducted research on the applications of emerging technology in theater, created a
              bot that generates roasts using Markov chains, and wrote a play about a family of
              adult children coping with the fact that their mother is a crash test dummy.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>

        <ScrollerOverlay content="capabilities">
          <ScrollerCard position="left">
            <Typography variant="body1">
              After graduation, I joined <b>Booz Allen Hamilton</b> as a data scientist.
            </Typography>
            <Typography variant="body1">
              Over time my interest in web development grew, and my role expanded into more{' '}
              <b>full stack design</b>, <b>implementation</b>, and <b>deployment</b>.
            </Typography>
            <Typography variant="body1">
              Today, I work on both large enterprise applications and lighter, quick-turnaround
              projects.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>

        <ScrollerOverlay content="survivor-video">
          <ScrollerCard>
            <Typography variant="body1">
              In my free time, I play tennis, listen to the latest Alvvays album, and apply for
              reality TV shows.
            </Typography>
            <Typography variant="body1">
              If you know a casting agent from CBS’s <i>Survivor</i> please put me in contact.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>
      </Scroller>

      <Container ref={portfolioRef}>
        <Portfolio />
      </Container>

      <Footer />
    </ThemeProvider>
  );
}

export default Home;

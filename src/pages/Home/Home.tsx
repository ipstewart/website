import { ThemeProvider } from '@emotion/react';
import { Card, CardContent, Link, PaletteMode } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
  const mapRef = useRef<MapAnimationRef>(null);
  const projectsRef = useRef(null);

  const [mode, setMode] = useState<PaletteMode>('light');

  const { ref: introRef, inView: introInView } = useInView({ triggerOnce: true });
  const { ref: schoolRef, inView: schoolInView } = useInView({ threshold: 0.5, triggerOnce: true });
  const { ref: capabilitiesRef, inView: capabilitiesInView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const { ref: portfolioRef, inView: portfolioInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: hobbyRef, inView: hobbyRefInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

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
      <Navbar toggleDarkMode={colorMode.toggleColorMode} projectsRef={projectsRef} />

      <Box className={styles.introContainer} ref={introRef}>
        <Avatar
          alt="Ian Stewart Avatar"
          src="images/avatar.png"
          sx={{
            width: 100,
            height: 100,
            bgcolor: 'primary.main',
            transform: `translateY(${introInView ? 0 : '20px'})`,
            opacity: introInView ? 1 : 0,
            transition: 'all .5s',
          }}
        />
        <Typography
          variant="h5"
          sx={{ opacity: introInView ? 1 : 0, transition: 'opacity .5s .5s' }}>
          Hi, I&apos;m <b>Ian</b>
        </Typography>
        <Box
          className={styles.arrowContainer}
          sx={{ opacity: introInView ? 1 : 0, transition: 'opacity .5s 1.5s' }}>
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
          <Grid container className="justify-center items-center h-full">
            <MapAnimation
              src={
                mode === 'light'
                  ? 'animations/map-animation-light.json'
                  : 'animations/map-animation-dark.json'
              }
              ref={mapRef}
            />
          </Grid>
        </Container>

        {/* OVERLAYS */}

        <ScrollerOverlay
          content="animation"
          onStepProgress={({ progress }) => {
            mapRef.current?.scrub({ start: 0, end: 12, progress });
          }}>
          <ScrollerCard>
            <Typography variant="body1">
              I was born in <b>California</b>, moving around until my family settled in{' '}
              <b>New Jersey</b>, where I grew up.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>

        <ScrollerOverlay
          content="animation"
          onStepProgress={({ progress }) => {
            mapRef.current?.scrub({ start: 12, end: 15, progress });
          }}>
          <ScrollerCard>
            <Typography variant="body1">
              I attended <b>Bowdoin College</b> in <b>Maine</b>, where I graduated in 2020.
            </Typography>
            <Typography variant="body1">
              In 2021, I moved to <b>Washington, DC</b>, where I currently reside.
            </Typography>
          </ScrollerCard>
        </ScrollerOverlay>
      </Scroller>

      <Box className={`${styles.minHContent} flex justify-center items-center p-6`}>
        <Grid container spacing={2} maxWidth="lg">
          <Grid item xs={12} md={3}>
            <Card
              className="flex justify-center"
              sx={{
                transform: `translateX(${schoolInView ? 0 : '-20px'})`,
                opacity: schoolInView ? 1 : 0,
                transition: 'all .5s',
              }}
              ref={schoolRef}>
              <CardContent>
                <Typography variant="body1">
                  In college I double majored in <b>Computer Science</b> and <b>Theater</b>.
                </Typography>
                <Typography variant="body1" mb="0">
                  I conducted research on the applications of emerging technology in theater,
                  created a bot that generates roasts using Markov chains, and wrote a play about a
                  family of adult children coping with the fact that their mother is a crash test
                  dummy.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              component="img"
              src="images/crash-test.jpg"
              alt="Crash Test Poster"
              className="h-full w-full object-cover"
              sx={{
                transform: `translateX(${schoolInView ? 0 : '20px'})`,
                opacity: schoolInView ? 1 : 0,
                transition: 'all .5s',
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box className={`${styles.minHContent} w-full flex justify-center items-center p-6`}>
        <Grid container spacing={2} maxWidth="lg" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card
              className="flex justify-center"
              sx={{
                transform: `translateX(${capabilitiesInView ? 0 : '-20px'})`,
                opacity: capabilitiesInView ? 1 : 0,
                transition: 'all .5s',
              }}
              ref={capabilitiesRef}>
              <CardContent>
                <Typography variant="body1">
                  After graduation, I joined <b>Booz Allen Hamilton</b> as a data scientist.
                </Typography>
                <Typography variant="body1">
                  Over time my interest in web development grew, and my role expanded into more{' '}
                  <b>full stack design</b>, <b>implementation</b>, and <b>deployment</b>.
                </Typography>
                <Typography variant="body1" mb="0">
                  Today, I work on both large enterprise applications and lighter, quick-turnaround
                  projects.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            height="450px"
            sx={{
              transform: `translateX(${capabilitiesInView ? 0 : '20px'})`,
              opacity: capabilitiesInView ? 1 : 0,
              transition: 'all .5s',
            }}>
            <Carousel />
          </Grid>
        </Grid>
      </Box>

      <Container ref={hobbyRef}>
        <Box
          className={`${styles.minHContent} flex flex-col justify-center items-center gap-5 py-8`}
          maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ opacity: hobbyRefInView ? 1 : 0, transition: '.5s opacity' }}>
                <Box p={2}>
                  <Typography variant="body1">
                    In my free time, I play tennis, brew green tea, listen to the latest Alvvays
                    album, and apply for reality TV shows.
                  </Typography>
                  <Typography variant="body1" mb="0">
                    If you know a casting agent from CBS's Survivor, please put me in contact. You
                    can view my latest audition reel{' '}
                    <Link
                      href="https://www.youtube.com/watch?v=BZSm9k2z2_o&ab_channel=IanStewart"
                      target="_blank">
                      here
                    </Link>
                    .
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ opacity: hobbyRefInView ? 1 : 0, transition: '.5s .5s opacity' }}>
              <Box
                component="img"
                alt="Miyajima Island"
                src="images/japan.jpg"
                className="w-full h-[400px] object-cover"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ opacity: hobbyRefInView ? 1 : 0, transition: '.5s 1s opacity' }}>
              <Box
                component="img"
                alt="Zion National Park"
                src="images/zion.jpg"
                className="w-full h-[400px] object-cover"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ opacity: hobbyRefInView ? 1 : 0, transition: '.5s 1.5s opacity' }}>
              <Box
                component="img"
                alt="The Narrows Trail"
                src="images/narrows.jpg"
                className="w-full h-[400px] object-cover"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container
        sx={{
          transform: `translateY(${portfolioInView ? 0 : '20px'})`,
          opacity: portfolioInView ? 1 : 0,
          transition: 'all .5s',
        }}
        ref={portfolioRef}>
        <Box ref={projectsRef} className="h-full">
          <Portfolio />
        </Box>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}

export default Home;

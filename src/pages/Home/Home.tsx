import GitHubIcon from '@mui/icons-material/GitHub';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
// prettier-ignore
import { Avatar, Box, Button, Container, CssBaseline, Grid, PaletteMode, ThemeProvider, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import { useMemo, useRef, useState } from 'react';

import Scroller from '../../components/Scroller';
import ScrollerCard from '../../components/ScrollerCard';
import ScrollerOverlay from '../../components/ScrollerOverlay';
import { getHomeTheme } from '../../styles/home-theme';
import { Carousel } from './Carousel/Carousel';
import styles from './Home.module.scss';
import MapAnimation, { MapAnimationRef } from './MapAnimation/MapAnimation';
import Navbar from './Navbar/Navbar';

function Home() {
  const lottieRef = useRef<MapAnimationRef>(null);

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
      <Navbar toggleDarkMode={colorMode.toggleColorMode} />

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
            className={
              mode === 'light' ? styles.arrow : `${styles.arrow} ${styles.arrowLight}`
            }></div>
          <div
            className={
              mode === 'light' ? styles.arrow : `${styles.arrow} ${styles.arrowLight}`
            }></div>
          <div
            className={
              mode === 'light' ? styles.arrow : `${styles.arrow} ${styles.arrowLight}`
            }></div>
        </Box>
      </Box>

      <Scroller>
        {/* BACKDROPS */}
        <Container data-name="animation" sx={{ height: '100%' }}>
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

        <Container data-name="school-images" sx={{ height: '100%' }}>
          <Grid container justifyContent="center" alignItems="center" height="100%" width="100%">
            <Grid container spacing={2} columns={{ xs: 6, sm: 12 }}>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="images/roast.png"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  component="img"
                  src="images/crash-test.jpg"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <Container data-name="capabilities" sx={{ height: '100%' }}>
          <Grid container justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={0} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Carousel
                items={[
                  {
                    title: 'Interactive Web Development',
                    description: 'Build applications using modern web frameworks',
                    icon: 0x1f310,
                  },
                  {
                    title: 'UI/UX Design and Research',
                    description: 'Create intuitive mockups and lead user testing',
                    icon: 0x1f4ca,
                  },
                  {
                    title: 'Full Stack Integration',
                    description: 'Develop APIs and databases to tie in with applications',
                    icon: 0x1f4bb,
                  },
                  {
                    title: 'Containerization and Deployment',
                    description: 'Prepare applications for the cloud with Docker',
                    icon: 0x1f433,
                  },
                  {
                    title: 'Mentor and Follow Best Practices',
                    description: 'Stay up to date on the latest tech and teach other devs',
                    icon: 0x1f393,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Container>

        <Container data-name="survivor-video" sx={{ height: '100%' }}>
          <Grid container justifyContent="center" alignItems="center" height="100%">
            <iframe
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/BZSm9k2z2_o?si=W86njCKQUUe7y_7V"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Grid>
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
              Overtime my interest in web development grew, and my role expanded into more{' '}
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

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', p: 5 }}>
        <Grid item xs={3}>
          <Typography variant="h4" sx={{ textAlign: 'center', maxWidth: '600px' }}>
            Stay tuned for more stuff <b>coming soon</b>. In the meantime, feel free to{' '}
            <b>contact me</b> using the methods below!
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          borderTop: '1px solid #e0e0e0',
        }}>
        <Button
          variant="contained"
          disableElevation
          href="mailto:stewart.p.ian@gmail.com"
          startIcon={<SendIcon />}>
          Email
        </Button>
        <Button
          variant="contained"
          disableElevation
          target="_blank"
          href="https://github.com/ipstewart"
          startIcon={<GitHubIcon />}>
          GitHub
        </Button>
        <Button
          variant="contained"
          disableElevation
          target="_blank"
          href="https://www.linkedin.com/in/ian-p-stewart/"
          startIcon={<LinkedInIcon />}>
          LinkedIn
        </Button>
        <Button
          variant="contained"
          disableElevation
          target="_blank"
          href="https://open.spotify.com/user/ianps737?si=f450137fffcd4c5b"
          startIcon={<LibraryMusicIcon />}>
          Spotify
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Home;

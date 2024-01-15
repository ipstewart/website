import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Fade, IconButton, MobileStepper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

function SurvivorHero() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1,
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? images.length - 1 : prevActiveStep - 1,
    );
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Grid container justifyContent="center" sx={{ my: 10, textAlign: 'center' }}>
      <Grid xs={8}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <IconButton aria-label="back" color="primary" onClick={handleBack}>
                <NavigateBeforeIcon />
              </IconButton>
              <Box>
                {images.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Fade in={activeStep === index}>
                        <Box
                          component="img"
                          sx={{
                            display: activeStep === index ? 'block' : 'none',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'all 1s',
                          }}
                          src={step.imgPath}
                          alt={step.label}
                        />
                      </Fade>
                    ) : null}
                  </div>
                ))}
              </Box>
              <IconButton aria-label="next" color="primary" onClick={handleNext}>
                <NavigateNextIcon />
              </IconButton>
            </Box>
            <MobileStepper
              steps={images.length}
              position="static"
              activeStep={activeStep}
              nextButton={<div />}
              backButton={<div />}
              sx={{ mt: 1 }}
            />
          </Box>
          {/* <Box component="img" src="avatar.jpg" alt="Photo of me" sx={{ maxWidth: '200px' }} /> */}
          <Typography variant="h1">My Interactive Survivor&nbsp;Reel</Typography>
          <Typography variant="body2">
            My name is Ian Stewart and I am a 25-year-old data scientist and software developer
            living in Washington, DC. I have been watching Survivor for 20 years and believe I have
            what it takes. Scroll down to learn&nbsp;why.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SurvivorHero;

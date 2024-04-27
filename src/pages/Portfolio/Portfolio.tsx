import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import styles from '../Home/Home.module.scss';

interface PortfolioItem {
  title: string;
  image: string;
  link: string;
  description: string;
  tags: string[];
  disabled: boolean;
}

function Portfolio() {
  const portfolioItems: PortfolioItem[] = [
    {
      title: 'Transit Tracker DC',
      image: 'images/transit-tracker.png',
      link: 'https://www.transittrackerdc.com/The%20White%20House%2C%20Pennsylvania%20Avenue%20Northwest%2C%20Washington%2C%20DC%2C%20USA',
      description:
        'Transit Tracker DC is a bus and metro arrival predictor for the Washington Metro Area that uses the WMATA and Google Maps APIs to query and display real time transit routes and schedules.',
      tags: ['React', 'API', 'Maps', 'Transit'],
      disabled: false,
    },
    {
      title: 'Word Node Game',
      image: 'images/node-game.png',
      link: '/word-node-game',
      description:
        'Inspired by the New York Times games, the Word Node Game is an original word puzzle that mixes vocabulary with spatial aptitude.',
      tags: ['Game Design', 'Puzzles', 'UI'],
      disabled: false,
    },
    {
      title: 'Coming Soon',
      image: 'images/crash-test.jpg',
      link: '/',
      description: 'More projects coming soon.',
      tags: [],
      disabled: true,
    },
  ];

  return (
    <Box className={`${styles.minHContent} flex flex-col justify-center gap-5 py-8`} maxWidth="lg">
      <Card className="w-max">
        <Typography variant="body1" mb="0" p={2}>
          Check out some of my projects for the latest.
        </Typography>
      </Card>
      <Grid container spacing={3}>
        {portfolioItems.map((item) => (
          <Grid item xs={12} sm={4} key={item.title}>
            <Link to={item.link} target="_blank">
              <Card
                className={`h-full flex flex-col ${item.disabled ? 'opacity-60 cursor-default' : 'cursor-pointer hover:shadow-lg hover:scale-105'}`}
                sx={{ transition: 'all 0.3s' }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  className="h-[250px] object-cover"
                  image={item.image}
                  title={item.title}
                />
                <CardContent className="h-full">
                  <Box className="h-full flex flex-col justify-between gap-2">
                    <Box>
                      <Typography variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <Box className="flex gap-2">
                      {item.tags.map((tag) => (
                        <Chip key={tag} color="primary" label={tag} size="small" />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Portfolio;

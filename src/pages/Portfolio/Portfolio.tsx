import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface PortfolioItem {
  title: string;
  image: string;
  link: string;
  description: string;
  disabled: boolean;
}

function Portfolio() {
  const portfolioItems: PortfolioItem[] = [
    {
      title: 'Word Node Game',
      image: 'images/node-game.png',
      link: '/word-node-game',
      description:
        'Inspired by the New York Times games, the Word Node Game is an original word puzzle that mixes vocabulary with spatial aptitude.',
      disabled: false,
    },
    {
      title: 'Coming Soon',
      image: 'images/crash-test.jpg',
      link: '/',
      description: 'More projects coming soon.',
      disabled: true,
    },
    {
      title: 'Coming Soon',
      image: 'images/crash-test.jpg',
      link: '/',
      description: 'More projects coming soon.',
      disabled: true,
    },
  ];

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center py-8">
      <Box>
        <Typography variant="h5" mb={2}>
          Check out <b>my stuff</b> for the latest
        </Typography>
        <Grid container spacing={3}>
          {portfolioItems.map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Link to={item.link}>
                <Card
                  className={`h-full flex flex-col ${item.disabled ? 'opacity-60 cursor-default' : 'cursor-pointer hover:shadow-lg hover:scale-105'}`}
                  sx={{ transition: 'all 0.3s' }}>
                  <CardMedia
                    component="img"
                    className="h-[250px] object-cover"
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Portfolio;

import { Card, Grid, Container } from '@mui/material';

const ScrollerCard = ({
  children,
  position,
}: {
  children: JSX.Element[] | JSX.Element;
  position?: string;
}) => {
  return (
    <Container className="h-screen flex justify-center items-center">
      <Grid container className="justify-center items-center h-full">
        {position === 'right' ? <Grid item xs={0} sm={6} /> : null}
        <Grid item xs={12} sm={6} className="flex justify-center items-center">
          <Card sx={{ boxShadow: 3, minWidth: 100, maxWidth: 300, padding: '12px 12px 0 12px' }}>
            {children}
          </Card>
        </Grid>
        {position === 'left' ? <Grid item xs={0} sm={6} /> : null}
      </Grid>
    </Container>
  );
};

export default ScrollerCard;

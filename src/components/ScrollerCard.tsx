import { Card, Grid, Container } from '@mui/material';

const ScrollerCard = ({
  children,
  position,
}: {
  children: JSX.Element[] | JSX.Element;
  position?: string;
}) => {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container justifyContent="center" alignItems="center" height="100%">
        {position === 'right' ? <Grid item xs={0} sm={6}></Grid> : null}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ boxShadow: 3, minWidth: 100, maxWidth: 300, padding: '12px 12px 0 12px' }}>
            {children}
          </Card>
        </Grid>
        {position === 'left' ? <Grid item xs={0} sm={6}></Grid> : null}
      </Grid>
    </Container>
  );
};

export default ScrollerCard;

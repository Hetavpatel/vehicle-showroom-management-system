import { Avatar, Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Landing = () => {
  return (
    <Container maxWidth="lg">
      <Box textAlign="center" py={8}>
        <Chip label="HIPAA/GDPR Ready" color="secondary" sx={{ mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Seamless bookings for clinics and boutique gyms
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={640} mx="auto" gutterBottom>
          WellNest gives your customers a modern scheduling experience, automated reminders, and AI-assisted support while keeping sensitive data secure.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={4}>
          <Button size="large" variant="contained" component={RouterLink} to="/register">
            Start free trial
          </Button>
          <Button size="large" variant="outlined" component={RouterLink} to="/help">
            View product tour
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3} mb={6}>
        {[
          {
            title: 'Real-time availability',
            description: 'Empower clients to book appointments or classes with instant calendar sync, buffer times, and time-zone awareness.'
          },
          {
            title: 'Automated reminders',
            description: 'Reduce no-shows with configurable SMS/email sequences tailored to appointment type and locale.'
          },
          {
            title: 'AI concierge',
            description: 'Answer FAQs, capture intake data, and triage leads before they confirm a booking.'
          }
        ].map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Trusted by modern wellness teams
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            {['Renew PT', 'Glow Aesthetics', 'Align Chiro', 'Pulse Fitness'].map((brand) => (
              <Stack key={brand} direction="row" spacing={2} alignItems="center">
                <Avatar>{brand.charAt(0)}</Avatar>
                <Box>
                  <Typography fontWeight={600}>{brand}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    “WellNest saved us 10+ hours weekly.”
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Landing;

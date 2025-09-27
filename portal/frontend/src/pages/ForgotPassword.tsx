import { useState } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box maxWidth={420} mx="auto">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reset your password
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Enter your email and we’ll send you a secure reset link.
          </Typography>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              disabled={submitted}
            />
            <Button type="submit" variant="contained" disabled={submitted}>
              {submitted ? 'Email sent' : 'Send reset link'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;

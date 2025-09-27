import { useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { signIn, signInWithOAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname ?? '/portal';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setError(null);
    try {
      await signInWithOAuth(provider, 'mock-token');
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'OAuth sign-in failed.');
    }
  };

  return (
    <Box maxWidth={420} mx="auto">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Access your bookings, reminders, and analytics dashboard.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              Sign in
            </Button>
            <Link component={RouterLink} to="/forgot-password" underline="hover" variant="body2">
              Forgot password?
            </Link>
          </Stack>
          <Divider sx={{ my: 3 }}>or continue with</Divider>
          <Stack spacing={2}>
            <Button variant="outlined" onClick={() => handleOAuth('google')}>
              Continue with Google
            </Button>
            <Button variant="outlined" onClick={() => handleOAuth('apple')}>
              Continue with Apple
            </Button>
          </Stack>
          <Typography variant="body2" mt={3} textAlign="center">
            New here? <Link component={RouterLink} to="/register">Create an account</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

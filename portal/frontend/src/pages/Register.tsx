import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const timezones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Singapore'
];

const locales = ['en-US', 'en-GB', 'fr-FR', 'es-ES'];

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: navigator.language
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signUp(form);
      navigate('/portal');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxWidth={480} mx="auto">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create your organization account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Invite staff and start accepting bookings in minutes.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField label="Full name" name="name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField label="Work email" name="email" value={form.email} onChange={handleChange} required type="email" fullWidth />
            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
              helperText="Must be at least 12 characters with a number and symbol"
            />
            <TextField select label="Time zone" name="timezone" value={form.timezone} onChange={handleChange} fullWidth>
              {timezones.map((tz) => (
                <MenuItem value={tz} key={tz}>
                  {tz}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label="Locale" name="locale" value={form.locale} onChange={handleChange} fullWidth>
              {locales.map((locale) => (
                <MenuItem value={locale} key={locale}>
                  {locale}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              Create account
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;

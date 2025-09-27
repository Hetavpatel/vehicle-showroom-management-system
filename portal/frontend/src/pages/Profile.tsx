import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { fetchReminderTemplates } from '../services/reminderService';

const Profile = () => {
  const { user } = useAuth();
  const { data: templates } = useQuery({ queryKey: ['reminder-templates'], queryFn: fetchReminderTemplates });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) {
    return null;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Profile & preferences
      </Typography>
      {success && <Alert severity="success">Profile settings updated.</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar sx={{ width: 96, height: 96 }} src={user.avatarUrl}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box textAlign="center">
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {user.role}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal settings
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField label="Full name" defaultValue={user.name} required />
                  <TextField label="Email" defaultValue={user.email} type="email" required />
                  <TextField label="Time zone" defaultValue={user.timezone} />
                  <TextField label="Locale" defaultValue={user.locale} />
                  <Button type="submit" variant="contained">
                    Save changes
                  </Button>
                </Stack>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Notification preferences
              </Typography>
              <Stack spacing={2}>
                {templates?.map((template) => (
                  <Stack key={template.id} direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body1">{template.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.channel.toUpperCase()} • {template.offsetMinutes} minutes before
                      </Typography>
                    </Box>
                    <Switch defaultChecked />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Profile;

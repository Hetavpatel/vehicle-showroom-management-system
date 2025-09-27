import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { fetchBookings } from '../services/bookingService';
import { fetchBookingReminders, fetchReminderTemplates, scheduleReminder, upsertReminderTemplate } from '../services/reminderService';

const Reminders = () => {
  const queryClient = useQueryClient();
  const { data: templates } = useQuery({ queryKey: ['reminder-templates'], queryFn: fetchReminderTemplates });
  const { data: bookings } = useQuery({ queryKey: ['bookings'], queryFn: fetchBookings });
  const [selectedBookingId, setSelectedBookingId] = useState<string>('');
  const { data: bookingReminders } = useQuery({
    queryKey: ['booking-reminders', selectedBookingId],
    queryFn: () => fetchBookingReminders(selectedBookingId),
    enabled: Boolean(selectedBookingId)
  });
  const [dialog, setDialog] = useState<{ open: boolean; template?: any }>({ open: false });
  const [error, setError] = useState<string | null>(null);

  const upsertTemplateMutation = useMutation({
    mutationFn: upsertReminderTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminder-templates'] });
      setDialog({ open: false });
    }
  });

  const scheduleReminderMutation = useMutation({
    mutationFn: ({ bookingId, templateId }: { bookingId: string; templateId: string }) => scheduleReminder(bookingId, { templateId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-reminders', selectedBookingId] });
    }
  });

  const handleTemplateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await upsertTemplateMutation.mutateAsync({
        id: (dialog.template?.id ?? undefined) as string,
        name: form.get('name') as string,
        channel: form.get('channel') as 'email' | 'sms',
        offsetMinutes: Number(form.get('offsetMinutes')),
        body: form.get('body') as string
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to save template.');
    }
  };

  const handleScheduleReminder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const templateId = form.get('templateId') as string;
    if (!selectedBookingId) {
      setError('Select a booking first.');
      return;
    }
    try {
      await scheduleReminderMutation.mutateAsync({ bookingId: selectedBookingId, templateId });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to schedule reminder.');
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Reminder automation
        </Typography>
        <Button variant="contained" onClick={() => setDialog({ open: true })}>
          Create template
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Templates
              </Typography>
              <Stack spacing={2}>
                {templates?.map((template) => (
                  <Box key={template.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1">{template.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {template.channel.toUpperCase()} • {template.offsetMinutes} minutes before
                        </Typography>
                      </Box>
                      <Button size="small" onClick={() => setDialog({ open: true, template })}>
                        Edit
                      </Button>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {template.body}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Schedule reminders
              </Typography>
              <Stack spacing={2}>
                <TextField
                  select
                  label="Select booking"
                  value={selectedBookingId}
                  onChange={(event) => setSelectedBookingId(event.target.value)}
                  helperText="Upcoming bookings with valid contact info"
                >
                  {bookings?.map((booking) => (
                    <MenuItem key={booking.id} value={booking.id}>
                      {new Date(booking.start).toLocaleString()} ({booking.status})
                    </MenuItem>
                  ))}
                </TextField>
                <Box component="form" onSubmit={handleScheduleReminder}>
                  <Stack spacing={2}>
                    <TextField select name="templateId" label="Template" required>
                      {templates?.map((template) => (
                        <MenuItem key={template.id} value={template.id}>
                          {template.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button type="submit" variant="contained" disabled={scheduleReminderMutation.isPending}>
                      Schedule reminder
                    </Button>
                  </Stack>
                </Box>
                <Typography variant="subtitle2" mt={2}>
                  Upcoming reminders
                </Typography>
                <Stack spacing={1}>
                  {bookingReminders?.map((reminder) => (
                    <Typography key={reminder.id} variant="body2" color="text.secondary">
                      {reminder.templateId} • Scheduled {new Date(reminder.scheduledFor).toLocaleString()} ({reminder.status})
                    </Typography>
                  )) ?? <Typography variant="body2">No reminders yet.</Typography>}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.template ? 'Edit template' : 'Create template'}</DialogTitle>
        <Box component="form" onSubmit={handleTemplateSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField name="name" label="Template name" defaultValue={dialog.template?.name} required />
              <TextField name="channel" label="Channel" defaultValue={dialog.template?.channel ?? 'email'} select>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="sms">SMS</MenuItem>
              </TextField>
              <TextField
                name="offsetMinutes"
                label="Offset (minutes before)"
                type="number"
                defaultValue={dialog.template?.offsetMinutes ?? 60}
                inputProps={{ min: 5, step: 5 }}
                required
              />
              <TextField
                name="body"
                label="Message body"
                defaultValue={dialog.template?.body}
                multiline
                minRows={4}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({ open: false })}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={upsertTemplateMutation.isPending}>
              Save template
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default Reminders;

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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { fetchBookings, createBooking, cancelBooking, fetchAvailability, Booking } from '../services/bookingService';
import { fetchClasses, fetchClinicians } from '../services/resourceService';

const Bookings = () => {
  const queryClient = useQueryClient();
  const [resourceType, setResourceType] = useState<'clinician' | 'class'>('clinician');
  const [selectedResource, setSelectedResource] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date(new Date().getTime() + 30 * 60000));
  const [notes, setNotes] = useState('');
  const [availability, setAvailability] = useState<Array<{ start: string; end: string }>>([]);
  const [cancelDialog, setCancelDialog] = useState<{ open: boolean; booking?: Booking }>({ open: false });
  const [error, setError] = useState<string | null>(null);

  const { data: bookings, isLoading } = useQuery({ queryKey: ['bookings'], queryFn: () => fetchBookings() });
  const { data: clinicians } = useQuery({ queryKey: ['clinicians'], queryFn: fetchClinicians });
  const { data: classes } = useQuery({ queryKey: ['classes'], queryFn: fetchClasses });

  const createMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => cancelBooking(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      setCancelDialog({ open: false });
    }
  });

  const handleLookupAvailability = async () => {
    if (!selectedResource || !selectedDate) return;
    try {
      const slots = await fetchAvailability(resourceType, selectedResource, selectedDate.toISOString());
      setAvailability(slots);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to load availability.');
    }
  };

  const handleCreateBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDate || !startTime || !endTime) return;
    const start = new Date(selectedDate);
    start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
    const end = new Date(selectedDate);
    end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
    try {
      await createMutation.mutateAsync({
        resourceType,
        resourceId: selectedResource,
        start: start.toISOString(),
        end: end.toISOString(),
        notes
      });
      setNotes('');
      setAvailability([]);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Could not create booking.');
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Manage bookings
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create booking
              </Typography>
              <Stack spacing={2} component="form" onSubmit={handleCreateBooking}>
                <ToggleButtonGroup
                  exclusive
                  value={resourceType}
                  onChange={(_, value) => value && setResourceType(value)}
                >
                  <ToggleButton value="clinician">Clinician</ToggleButton>
                  <ToggleButton value="class">Class</ToggleButton>
                </ToggleButtonGroup>
                <FormControl fullWidth>
                  <InputLabel id="resource-select">Select {resourceType}</InputLabel>
                  <Select
                    labelId="resource-select"
                    label={`Select ${resourceType}`}
                    value={selectedResource}
                    onChange={(event) => setSelectedResource(event.target.value)}
                    required
                  >
                    {(resourceType === 'clinician' ? clinicians : classes)?.map((resource: any) => (
                      <MenuItem key={resource.id} value={resource.id}>
                        {'name' in resource ? resource.name : resource.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(value) => setSelectedDate(value)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TimeField
                    label="Start"
                    value={startTime}
                    onChange={(value) => setStartTime(value)}
                    format="HH:mm"
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                  <TimeField
                    label="End"
                    value={endTime}
                    onChange={(value) => setEndTime(value)}
                    format="HH:mm"
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Stack>
                <TextField
                  label="Notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  multiline
                  minRows={2}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button variant="outlined" onClick={handleLookupAvailability}>
                    Check availability
                  </Button>
                  <Button type="submit" variant="contained" disabled={createMutation.isPending}>
                    Book slot
                  </Button>
                </Stack>
                <Stack spacing={1}>
                  {availability.map((slot) => (
                    <Typography key={slot.start} variant="body2" color="text.secondary">
                      {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleTimeString()}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming & recent bookings
              </Typography>
              <Stack spacing={2} maxHeight={460} sx={{ overflowY: 'auto' }}>
                {isLoading && <Typography>Loading…</Typography>}
                {bookings?.map((booking) => (
                  <Box key={booking.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {booking.clinicianId ? `Clinician visit` : 'Class booking'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(booking.start).toLocaleString()} - {new Date(booking.end).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {booking.status}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Button size="small" variant="outlined" onClick={() => setCancelDialog({ open: true, booking })}>
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                )) ?? <Typography variant="body2">No bookings yet.</Typography>}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={cancelDialog.open} onClose={() => setCancelDialog({ open: false })}>
        <DialogTitle>Cancel booking</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to cancel this booking? Reminders will stop automatically.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog({ open: false })}>Close</Button>
          <Button
            color="error"
            onClick={() =>
              cancelMutation.mutate({ id: cancelDialog.booking!.id, reason: 'Cancelled via portal' })
            }
          >
            Confirm cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Bookings;

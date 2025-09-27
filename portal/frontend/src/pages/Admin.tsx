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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { fetchClinicians } from '../services/resourceService';
import httpClient from '../services/httpClient';

const Admin = () => {
  const queryClient = useQueryClient();
  const { data: staff } = useQuery({ queryKey: ['staff'], queryFn: async () => (await httpClient.get('/admin/staff')).data });
  const { data: clinicians } = useQuery({ queryKey: ['clinicians'], queryFn: fetchClinicians });
  const [dialog, setDialog] = useState<{ open: boolean; data?: any }>({ open: false });
  const [error, setError] = useState<string | null>(null);

  const inviteMutation = useMutation({
    mutationFn: async (payload: any) => (await httpClient.post('/admin/staff', payload)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      setDialog({ open: false });
    }
  });

  const deactivateMutation = useMutation({
    mutationFn: async (id: string) => (await httpClient.delete(`/admin/staff/${id}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await inviteMutation.mutateAsync({
        name: form.get('name'),
        email: form.get('email'),
        role: form.get('role'),
        clinicianId: form.get('clinicianId') || null
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to invite staff.');
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Organization admin
        </Typography>
        <Button variant="contained" onClick={() => setDialog({ open: true })}>
          Invite staff
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Staff directory
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Clinician mapping</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staff?.map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.clinicianId ? clinicians?.find((c) => c.id === member.clinicianId)?.name : '—'}</TableCell>
                      <TableCell align="right">
                        <Button color="error" size="small" onClick={() => deactivateMutation.mutate(member.id)}>
                          Deactivate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>Invite staff member</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField name="name" label="Full name" required />
              <TextField name="email" label="Email" type="email" required />
              <TextField name="role" label="Role" select defaultValue="staff" required>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="member">Member</MenuItem>
              </TextField>
              <TextField name="clinicianId" label="Map to clinician" select defaultValue="">
                <MenuItem value="">None</MenuItem>
                {clinicians?.map((clinician) => (
                  <MenuItem key={clinician.id} value={clinician.id}>
                    {clinician.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({ open: false })}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={inviteMutation.isPending}>
              Send invite
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default Admin;

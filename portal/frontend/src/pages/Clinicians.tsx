import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Clinician, fetchClinicians, upsertClinician } from '../services/resourceService';

const Clinicians = () => {
  const queryClient = useQueryClient();
  const { data: clinicians, isLoading } = useQuery({ queryKey: ['clinicians'], queryFn: fetchClinicians });
  const [dialog, setDialog] = useState<{ open: boolean; data?: Partial<Clinician> }>({ open: false });
  const [error, setError] = useState<string | null>(null);

  const upsertMutation = useMutation({
    mutationFn: upsertClinician,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clinicians'] });
      setDialog({ open: false });
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload: Clinician = {
      id: (dialog.data?.id ?? undefined) as string,
      name: form.get('name') as string,
      specialty: form.get('specialty') as string,
      certifications: (form.get('certifications') as string).split(',').map((item) => item.trim()).filter(Boolean),
      bio: form.get('bio') as string,
      languages: (form.get('languages') as string).split(',').map((item) => item.trim()).filter(Boolean),
      avatarUrl: form.get('avatarUrl') as string
    };
    try {
      await upsertMutation.mutateAsync(payload);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to save clinician.');
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Clinicians & practitioners
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setDialog({ open: true })}>
          Add clinician
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {clinicians?.map((clinician) => (
          <Grid item xs={12} md={6} key={clinician.id}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={clinician.avatarUrl}>{clinician.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="h6">{clinician.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {clinician.specialty}
                      </Typography>
                    </Box>
                  </Stack>
                  <Button variant="text" startIcon={<EditIcon />} onClick={() => setDialog({ open: true, data: clinician })}>
                    Edit
                  </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary" mt={2} mb={1}>
                  {clinician.bio}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Typography variant="caption">Certifications: {clinician.certifications.join(', ')}</Typography>
                  <Typography variant="caption">Languages: {clinician.languages.join(', ')}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {!isLoading && !clinicians?.length && <Typography>No clinicians added yet.</Typography>}

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.data?.id ? 'Edit clinician' : 'Add clinician'}</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField name="name" label="Full name" defaultValue={dialog.data?.name} required />
              <TextField name="specialty" label="Specialty" defaultValue={dialog.data?.specialty} required />
              <TextField
                name="certifications"
                label="Certifications"
                defaultValue={dialog.data?.certifications?.join(', ')}
                helperText="Comma-separated list"
              />
              <TextField
                name="languages"
                label="Languages"
                defaultValue={dialog.data?.languages?.join(', ')}
                helperText="Comma-separated list"
              />
              <TextField name="avatarUrl" label="Avatar URL" defaultValue={dialog.data?.avatarUrl} />
              <TextField
                name="bio"
                label="Bio"
                defaultValue={dialog.data?.bio}
                multiline
                minRows={3}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({ open: false })}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={upsertMutation.isPending}>
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default Clinicians;

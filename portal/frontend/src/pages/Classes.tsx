import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { fetchClasses, fetchClinicians, upsertClass, FitnessClass } from '../services/resourceService';

const Classes = () => {
  const queryClient = useQueryClient();
  const { data: classes, isLoading } = useQuery({ queryKey: ['classes'], queryFn: fetchClasses });
  const { data: clinicians } = useQuery({ queryKey: ['clinicians'], queryFn: fetchClinicians });
  const [dialog, setDialog] = useState<{ open: boolean; data?: Partial<FitnessClass> }>({ open: false });
  const [error, setError] = useState<string | null>(null);

  const upsertMutation = useMutation({
    mutationFn: upsertClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      setDialog({ open: false });
    }
  });

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload: FitnessClass = {
      id: (dialog.data?.id ?? form.get('id') ?? undefined) as string,
      name: form.get('name') as string,
      description: form.get('description') as string,
      coachId: form.get('coachId') as string,
      capacity: Number(form.get('capacity')),
      durationMinutes: Number(form.get('durationMinutes')),
      tags: (form.get('tags') as string).split(',').map((tag) => tag.trim()).filter(Boolean)
    };
    try {
      await upsertMutation.mutateAsync(payload);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Unable to save class.');
    }
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700}>
          Fitness classes
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setDialog({ open: true })}>
          Create class
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {classes?.map((fitnessClass) => (
          <Grid item xs={12} md={6} key={fitnessClass.id}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">{fitnessClass.name}</Typography>
                  <IconButton onClick={() => setDialog({ open: true, data: fitnessClass })}>
                    <EditIcon />
                  </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
                  {fitnessClass.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                  <Chip label={`Capacity ${fitnessClass.capacity}`} />
                  <Chip label={`${fitnessClass.durationMinutes} min`} />
                  {fitnessClass.tags.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Coach: {clinicians?.find((c) => c.id === fitnessClass.coachId)?.name ?? 'Unassigned'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {!isLoading && !classes?.length && <Typography>No classes configured yet.</Typography>}

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false })} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.data?.id ? 'Edit class' : 'Create class'}</DialogTitle>
        <Box component="form" onSubmit={handleSave}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField name="name" label="Class name" defaultValue={dialog.data?.name} required fullWidth />
              <TextField
                name="description"
                label="Description"
                defaultValue={dialog.data?.description}
                required
                multiline
                minRows={3}
              />
              <TextField name="coachId" label="Coach" defaultValue={dialog.data?.coachId} required select>
                {clinicians?.map((clinician) => (
                  <MenuItem value={clinician.id} key={clinician.id}>
                    {clinician.name}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  name="capacity"
                  label="Capacity"
                  type="number"
                  inputProps={{ min: 1 }}
                  defaultValue={dialog.data?.capacity ?? 10}
                  required
                />
                <TextField
                  name="durationMinutes"
                  label="Duration (minutes)"
                  type="number"
                  inputProps={{ min: 15, step: 15 }}
                  defaultValue={dialog.data?.durationMinutes ?? 45}
                  required
                />
              </Stack>
              <TextField
                name="tags"
                label="Tags (comma separated)"
                defaultValue={dialog.data?.tags?.join(', ')}
                placeholder="mobility, strength, prenatal"
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

export default Classes;

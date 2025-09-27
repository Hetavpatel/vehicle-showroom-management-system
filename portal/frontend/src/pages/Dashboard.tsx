import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '../services/bookingService';
import { fetchAttendanceTrends, fetchSuggestions, fetchUtilization } from '../services/analyticsService';

const Dashboard = () => {
  const { data: bookings } = useQuery({ queryKey: ['bookings', { status: 'booked' }], queryFn: () => fetchBookings({ status: 'booked' }) });
  const { data: utilization } = useQuery({ queryKey: ['utilization'], queryFn: fetchUtilization });
  const { data: suggestions } = useQuery({ queryKey: ['suggestions'], queryFn: fetchSuggestions });
  const { data: attendance } = useQuery({ queryKey: ['attendance', '30d'], queryFn: () => fetchAttendanceTrends('30d') });

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={700}>
        Today’s overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Upcoming bookings
              </Typography>
              <Typography variant="h3" fontWeight={700}>
                {bookings?.length ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmed visits in the next 7 days.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Average utilization
              </Typography>
              <Typography variant="h3" fontWeight={700}>
                {utilization?.[0]?.utilizationRate ? Math.round(utilization[0].utilizationRate * 100) : 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on staffed resources this week.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                No-show rate trend
              </Typography>
              <Stack spacing={1} mt={2}>
                {attendance?.map((item) => (
                  <Box key={item.label}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round(item.noShowRate * 100)}%
                      </Typography>
                    </Stack>
                    <LinearProgress value={item.noShowRate * 100} variant="determinate" color="secondary" sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                )) ?? <Typography variant="body2">No trend data yet.</Typography>}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Action center</Typography>
                <Chip label="AI" color="secondary" size="small" />
              </Stack>
              <List>
                {suggestions?.map((suggestion) => (
                  <ListItem key={suggestion.resourceId} alignItems="flex-start" divider>
                    <ListItemAvatar>
                      <Avatar>{suggestion.resourceType === 'clinician' ? 'C' : 'F'}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Optimize ${suggestion.resourceType} schedule`}
                      secondary={suggestion.recommendedSlots
                        .map((slot) => `${new Date(slot.start).toLocaleString()} (${Math.round(slot.probability * 100)}% fill)`) 
                        .join(' • ')}
                    />
                  </ListItem>
                )) ?? <Typography variant="body2">No recommendations right now.</Typography>}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team utilization
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {utilization?.map((resource) => (
                  <Box key={resource.resourceId}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2" fontWeight={600}>
                        {resource.resourceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round(resource.utilizationRate * 100)}%
                      </Typography>
                    </Stack>
                    <LinearProgress value={resource.utilizationRate * 100} variant="determinate" sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                )) ?? <Typography variant="body2">No utilization data.</Typography>}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Dashboard;

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { fetchAttendanceTrends, fetchSuggestions, fetchUtilization } from '../services/analyticsService';

const Analytics = () => {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const { data: attendance } = useQuery({ queryKey: ['attendance', period], queryFn: () => fetchAttendanceTrends(period) });
  const { data: utilization } = useQuery({ queryKey: ['utilization'], queryFn: fetchUtilization });
  const { data: suggestions } = useQuery({ queryKey: ['suggestions'], queryFn: fetchSuggestions });

  const averageNoShowRate = useMemo(() => {
    if (!attendance?.length) return 0;
    return attendance.reduce((total, item) => total + item.noShowRate, 0) / attendance.length;
  }, [attendance]);

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Typography variant="h4" fontWeight={700}>
          Analytics dashboard
        </Typography>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="period-label">Period</InputLabel>
          <Select labelId="period-label" value={period} label="Period" onChange={(event) => setPeriod(event.target.value as any)}>
            <MenuItem value="7d">Last 7 days</MenuItem>
            <MenuItem value="30d">Last 30 days</MenuItem>
            <MenuItem value="90d">Last 90 days</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Average no-show rate
              </Typography>
              <Typography variant="h3" fontWeight={700}>
                {Math.round(averageNoShowRate * 100)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Adjust templates and incentives to drive attendance.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Highest performing resource
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {utilization?.[0]?.resourceName ?? 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {utilization?.[0] ? `${Math.round(utilization[0].utilizationRate * 100)}% utilization` : 'No data yet.'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                AI booking insights
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {suggestions?.length ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Intelligent opportunities identified this period.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Attendance trend
          </Typography>
          <Stack spacing={2}>
            {attendance?.map((item) => (
              <Box key={item.label} sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                <Typography fontWeight={600}>{item.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Attendance rate {Math.round(item.attendanceRate * 100)}% • No-show {Math.round(item.noShowRate * 100)}%
                </Typography>
              </Box>
            )) ?? <Typography variant="body2">No attendance data available.</Typography>}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            AI booking suggestions
          </Typography>
          <Stack spacing={2}>
            {suggestions?.map((suggestion) => (
              <Box key={suggestion.resourceId} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                <Typography fontWeight={600}>
                  {suggestion.resourceType === 'clinician' ? 'Clinician schedule' : 'Class schedule'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {suggestion.recommendedSlots.map((slot) => `${new Date(slot.start).toLocaleString()} (${Math.round(slot.probability * 100)}% likely to fill)`).join(' • ')}
                </Typography>
              </Box>
            )) ?? <Typography variant="body2">No AI suggestions yet.</Typography>}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Analytics;

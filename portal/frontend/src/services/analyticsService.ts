import httpClient from './httpClient';

export type AttendanceTrend = {
  label: string;
  attendanceRate: number;
  noShowRate: number;
};

export type PredictiveSuggestion = {
  resourceId: string;
  resourceType: 'clinician' | 'class';
  recommendedSlots: Array<{ start: string; probability: number }>;
};

export type UtilizationSnapshot = {
  resourceId: string;
  resourceName: string;
  utilizationRate: number;
};

export const fetchAttendanceTrends = async (period: '7d' | '30d' | '90d') => {
  const { data } = await httpClient.get<AttendanceTrend[]>('/analytics/attendance', { params: { period } });
  return data;
};

export const fetchUtilization = async () => {
  const { data } = await httpClient.get<UtilizationSnapshot[]>('/analytics/utilization');
  return data;
};

export const fetchSuggestions = async () => {
  const { data } = await httpClient.get<PredictiveSuggestion[]>('/analytics/suggestions');
  return data;
};

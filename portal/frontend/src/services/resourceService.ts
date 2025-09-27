import httpClient from './httpClient';

export type Clinician = {
  id: string;
  name: string;
  specialty: string;
  certifications: string[];
  bio?: string;
  languages: string[];
  avatarUrl?: string;
};

export type FitnessClass = {
  id: string;
  name: string;
  description: string;
  coachId: string;
  capacity: number;
  durationMinutes: number;
  tags: string[];
};

export const fetchClinicians = async () => {
  const { data } = await httpClient.get<Clinician[]>('/resources/clinicians');
  return data;
};

export const fetchClasses = async () => {
  const { data } = await httpClient.get<FitnessClass[]>('/resources/classes');
  return data;
};

export const upsertClinician = async (payload: Clinician) => {
  const { data } = await httpClient.put<Clinician>(`/resources/clinicians/${payload.id ?? 'new'}`, payload);
  return data;
};

export const upsertClass = async (payload: FitnessClass) => {
  const { data } = await httpClient.put<FitnessClass>(`/resources/classes/${payload.id ?? 'new'}`, payload);
  return data;
};

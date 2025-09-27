import httpClient from './httpClient';

export type BookingStatus = 'booked' | 'checked_in' | 'completed' | 'cancelled' | 'no_show';

export type Booking = {
  id: string;
  memberId: string;
  clinicianId?: string;
  classId?: string;
  start: string;
  end: string;
  status: BookingStatus;
  notes?: string;
};

export type CreateBookingPayload = {
  resourceType: 'clinician' | 'class';
  resourceId: string;
  start: string;
  end: string;
  notes?: string;
};

const normalizeBooking = (booking: any): Booking => ({
  id: booking.id,
  memberId: booking.memberId ?? booking.member_id,
  clinicianId: booking.clinicianId ?? booking.clinician_id ?? undefined,
  classId: booking.classId ?? booking.class_id ?? undefined,
  start: booking.start,
  end: booking.end,
  status: booking.status,
  notes: booking.notes ?? undefined
});

export const fetchBookings = async (params?: { status?: BookingStatus; from?: string; to?: string }) => {
  const { data } = await httpClient.get('/bookings', { params });
  return data.map(normalizeBooking);
};

export const createBooking = async (payload: CreateBookingPayload) => {
  const { data } = await httpClient.post('/bookings', payload);
  return normalizeBooking(data);
};

export const updateBooking = async (id: string, payload: Partial<CreateBookingPayload> & { status?: BookingStatus }) => {
  const { data } = await httpClient.patch(`/bookings/${id}`, payload);
  return normalizeBooking(data);
};

export const cancelBooking = async (id: string, reason?: string) => {
  const { data } = await httpClient.post(`/bookings/${id}/cancel`, { reason });
  return normalizeBooking(data);
};

export const fetchAvailability = async (resourceType: 'clinician' | 'class', resourceId: string, date: string) => {
  const { data } = await httpClient.get(`/availability/${resourceType}/${resourceId}`, { params: { date } });
  return data;
};

import httpClient from './httpClient';

export type ReminderTemplate = {
  id: string;
  name: string;
  channel: 'email' | 'sms';
  offsetMinutes: number;
  body: string;
};

export type ReminderSetting = {
  id: string;
  bookingId: string;
  templateId: string;
  status: 'scheduled' | 'sent' | 'failed';
  scheduledFor: string;
};

const normalizeTemplate = (template: any): ReminderTemplate => ({
  id: template.id,
  name: template.name,
  channel: template.channel,
  offsetMinutes: template.offsetMinutes ?? template.offset_minutes,
  body: template.body
});

const normalizeReminder = (reminder: any): ReminderSetting => ({
  id: reminder.id,
  bookingId: reminder.bookingId ?? reminder.booking_id,
  templateId: reminder.templateId ?? reminder.template_id,
  status: reminder.status,
  scheduledFor: reminder.scheduledFor ?? reminder.scheduled_for,
});

export const fetchReminderTemplates = async () => {
  const { data } = await httpClient.get('/reminders/templates');
  return data.map(normalizeTemplate);
};

export const upsertReminderTemplate = async (payload: ReminderTemplate) => {
  const templateId = payload.id ?? (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
  const { data } = await httpClient.put(`/reminders/templates/${templateId}`, { ...payload, id: templateId });
  return normalizeTemplate(data);
};

export const fetchBookingReminders = async (bookingId: string) => {
  const { data } = await httpClient.get(`/reminders/${bookingId}`);
  return data.map(normalizeReminder);
};

export const scheduleReminder = async (bookingId: string, payload: { templateId: string }) => {
  const { data } = await httpClient.post(`/reminders/${bookingId}`, payload);
  return normalizeReminder(data);
};

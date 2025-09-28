import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export function toTenantTimezone(date: Date, timezone: string) {
  return utcToZonedTime(date, timezone);
}

export function fromTenantTimezone(date: Date, timezone: string) {
  return zonedTimeToUtc(date, timezone);
}

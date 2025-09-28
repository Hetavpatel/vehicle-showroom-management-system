import createHttpError from 'http-errors';
import { addMinutes, subHours } from 'date-fns';

import { prisma } from '../../database/prisma.js';
import type { AuthenticatedRequest } from '../../types/express.js';

export async function listServices(tenantId: string, filters: { type?: string; staffId?: string; locationId?: string }) {
  return prisma.service.findMany({
    where: {
      tenantId,
      type: filters.type as any,
      staff: filters.staffId ? { some: { id: filters.staffId } } : undefined,
      locationId: filters.locationId
    },
    include: {
      location: true
    }
  });
}

export async function getAvailability({
  tenantId,
  serviceId,
  staffId,
  start,
  end
}: {
  tenantId: string;
  serviceId: string;
  staffId?: string;
  start: Date;
  end: Date;
}) {
  const service = await prisma.service.findFirst({ where: { id: serviceId, tenantId } });
  if (!service) {
    throw createHttpError(404, 'Service not found');
  }

  const bookings = await prisma.booking.findMany({
    where: {
      serviceId,
      tenantId,
      startAt: {
        gte: start,
        lte: end
      },
      status: {
        in: ['BOOKED', 'CONFIRMED', 'WAITLISTED']
      },
      staffId
    }
  });

  return bookings.map((booking) => ({
    startAt: booking.startAt,
    endAt: booking.endAt,
    status: booking.status
  }));
}

export async function createBooking({
  user,
  serviceId,
  startAt,
  notes
}: {
  user: AuthenticatedRequest['user'];
  serviceId: string;
  startAt: Date;
  notes?: string;
}) {
  const service = await prisma.service.findFirst({ where: { id: serviceId, tenantId: user.tenantId } });
  if (!service) {
    throw createHttpError(404, 'Service not found');
  }

  const endAt = addMinutes(startAt, service.durationMinutes);

  const overlapping = await prisma.booking.findFirst({
    where: {
      tenantId: user.tenantId,
      serviceId,
      memberId: user.id,
      startAt,
      status: {
        in: ['BOOKED', 'CONFIRMED']
      }
    }
  });

  if (overlapping) {
    throw createHttpError(409, 'Booking already exists for this slot');
  }

  return prisma.booking.create({
    data: {
      tenantId: user.tenantId,
      serviceId,
      memberId: user.id,
      startAt,
      endAt,
      status: 'BOOKED',
      notesEncrypted: notes ?? undefined
    }
  });
}

export async function updateBookingStatus({
  tenantId,
  bookingId,
  status
}: {
  tenantId: string;
  bookingId: string;
  status: 'CANCELED' | 'CONFIRMED' | 'NO_SHOW';
}) {
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, tenantId } });
  if (!booking) {
    throw createHttpError(404, 'Booking not found');
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      status
    }
  });
}

export async function cancelBooking(tenantId: string, bookingId: string) {
  const booking = await prisma.booking.findFirst({ where: { id: bookingId, tenantId } });
  if (!booking) {
    throw createHttpError(404, 'Booking not found');
  }

  const cancellationWindow = subHours(booking.startAt, 24);
  if (new Date() > cancellationWindow) {
    throw createHttpError(400, 'Cancellation window has passed');
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'CANCELED'
    }
  });
}

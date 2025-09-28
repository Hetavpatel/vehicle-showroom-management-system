import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import type { AuthenticatedRequest } from '../../types/express.js';
import {
  cancelBooking,
  createBooking,
  getAvailability,
  listServices,
  updateBookingStatus
} from './bookings.service.js';

const serviceQuerySchema = z.object({
  type: z.string().optional(),
  staffId: z.string().optional(),
  locationId: z.string().optional()
});

const availabilitySchema = z.object({
  serviceId: z.string(),
  staffId: z.string().optional(),
  start: z.string().datetime(),
  end: z.string().datetime()
});

const createBookingSchema = z.object({
  serviceId: z.string(),
  startAt: z.string().datetime(),
  notes: z.string().optional()
});

const statusSchema = z.object({
  status: z.enum(['CANCELED', 'CONFIRMED', 'NO_SHOW'])
});

export async function listServicesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const filters = serviceQuerySchema.parse(req.query);
    const result = await listServices(user.tenantId, filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAvailabilityHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const payload = availabilitySchema.parse(req.query);
    const result = await getAvailability({
      tenantId: user.tenantId,
      serviceId: payload.serviceId,
      staffId: payload.staffId,
      start: new Date(payload.start),
      end: new Date(payload.end)
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const payload = createBookingSchema.parse(req.body);
    const result = await createBooking({
      user,
      serviceId: payload.serviceId,
      startAt: new Date(payload.startAt),
      notes: payload.notes
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatusHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const payload = statusSchema.parse(req.body);
    const bookingId = z.string().parse(req.params.bookingId);
    const result = await updateBookingStatus({
      tenantId: user.tenantId,
      bookingId,
      status: payload.status
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function cancelBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const bookingId = z.string().parse(req.params.bookingId);
    const result = await cancelBooking(user.tenantId, bookingId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

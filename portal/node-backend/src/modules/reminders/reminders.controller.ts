import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import type { AuthenticatedRequest } from '../../types/express.js';
import { listTemplates, scheduleReminder } from './reminders.service.js';

const scheduleSchema = z.object({
  bookingId: z.string(),
  channel: z.enum(['SMS', 'EMAIL']),
  sendAt: z.string().datetime(),
  payload: z.record(z.any()).default({})
});

export async function listTemplatesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const result = await listTemplates(user.tenantId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function scheduleReminderHandler(req: Request, res: Response, next: NextFunction) {
  try {
    scheduleSchema.parse(req.body);
    const { bookingId, channel, sendAt, payload } = scheduleSchema.parse(req.body);
    const reminder = await scheduleReminder({
      bookingId,
      channel,
      sendAt: new Date(sendAt),
      payload
    });
    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
}

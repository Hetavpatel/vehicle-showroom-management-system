import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import type { AuthenticatedRequest } from '../../types/express.js';
import { getAttendanceSummary, getNoShowRate, getPredictiveSuggestions } from './analytics.service.js';

const dateRangeSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime()
});

export async function attendanceHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const { start, end } = dateRangeSchema.parse(req.query);
    const result = await getAttendanceSummary(user.tenantId, new Date(start), new Date(end));
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function noShowRateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const result = await getNoShowRate(user.tenantId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function predictiveSuggestionsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const { memberId } = z.object({ memberId: z.string() }).parse(req.query);
    const result = await getPredictiveSuggestions(user.tenantId, memberId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

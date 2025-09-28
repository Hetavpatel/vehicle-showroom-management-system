import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import type { AuthenticatedRequest } from '../../types/express.js';
import { getCurrentUser, updateProfile } from './users.service.js';

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneEncrypted: z.string().optional(),
  timezone: z.string().optional()
});

export async function getMeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const result = await getCurrentUser(user);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateProfileHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const payload = updateSchema.parse(req.body);
    const result = await updateProfile(user, payload);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

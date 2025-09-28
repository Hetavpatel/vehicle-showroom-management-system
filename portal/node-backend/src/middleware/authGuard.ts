import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import type { AuthenticatedRequest } from '../types/express.js';

export function authGuard(requiredRoles?: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createHttpError(401, 'Missing authorization header'));
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as AuthenticatedRequest['user'];
      (req as AuthenticatedRequest).user = payload;
      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        return next(createHttpError(403, 'Insufficient permissions'));
      }
      return next();
    } catch (error) {
      return next(createHttpError(401, 'Invalid or expired token'));
    }
  };
}

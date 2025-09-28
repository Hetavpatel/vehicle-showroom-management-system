import type { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger.js';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = typeof err === 'object' && err !== null && 'status' in err ? (err as any).status : 500;
  const message = typeof err === 'object' && err !== null && 'message' in err ? (err as any).message : 'Internal Server Error';

  logger.error({ err }, 'Request failed');

  res.status(status).json({
    error: {
      message,
      status
    }
  });
}

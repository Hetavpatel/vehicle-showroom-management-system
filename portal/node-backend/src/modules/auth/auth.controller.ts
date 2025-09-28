import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { login, refreshToken, signup } from './auth.service.js';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  tenantId: z.string().min(1)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1)
});

export async function signupHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = signupSchema.parse(req.body);
    const result = await signup(payload);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = loginSchema.parse(req.body);
    const result = await login(payload);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function refreshHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = refreshSchema.parse(req.body);
    const tokens = await refreshToken(payload.refreshToken);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
}

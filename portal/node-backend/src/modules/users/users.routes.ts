import { Router } from 'express';

import { authGuard } from '../../middleware/authGuard.js';
import { getMeHandler, updateProfileHandler } from './users.controller.js';

export const usersRouter = Router();

usersRouter.use(authGuard());
usersRouter.get('/me', getMeHandler);
usersRouter.patch('/me', updateProfileHandler);

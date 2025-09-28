import { Router } from 'express';

import { authGuard } from '../../middleware/authGuard.js';
import { listTemplatesHandler, scheduleReminderHandler } from './reminders.controller.js';

export const remindersRouter = Router();

remindersRouter.use(authGuard(['ADMIN', 'STAFF']));
remindersRouter.get('/templates', listTemplatesHandler);
remindersRouter.post('/schedule', scheduleReminderHandler);

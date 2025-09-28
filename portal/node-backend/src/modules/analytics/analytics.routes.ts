import { Router } from 'express';

import { authGuard } from '../../middleware/authGuard.js';
import { attendanceHandler, noShowRateHandler, predictiveSuggestionsHandler } from './analytics.controller.js';

export const analyticsRouter = Router();

analyticsRouter.use(authGuard(['ADMIN', 'STAFF']));
analyticsRouter.get('/attendance', attendanceHandler);
analyticsRouter.get('/no-show-rate', noShowRateHandler);
analyticsRouter.get('/predictive-suggestions', predictiveSuggestionsHandler);

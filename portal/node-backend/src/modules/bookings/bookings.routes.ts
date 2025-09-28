import { Router } from 'express';

import { authGuard } from '../../middleware/authGuard.js';
import {
  cancelBookingHandler,
  createBookingHandler,
  getAvailabilityHandler,
  listServicesHandler,
  updateBookingStatusHandler
} from './bookings.controller.js';

export const bookingsRouter = Router();

bookingsRouter.use(authGuard());
bookingsRouter.get('/services', listServicesHandler);
bookingsRouter.get('/availability', getAvailabilityHandler);
bookingsRouter.post('/', createBookingHandler);
bookingsRouter.patch('/:bookingId/status', updateBookingStatusHandler);
bookingsRouter.post('/:bookingId/cancel', cancelBookingHandler);

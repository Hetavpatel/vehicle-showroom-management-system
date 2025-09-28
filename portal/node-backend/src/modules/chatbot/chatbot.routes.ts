import { Router } from 'express';

import { authGuard } from '../../middleware/authGuard.js';
import { chatbotHandler } from './chatbot.controller.js';

export const chatbotRouter = Router();

chatbotRouter.use(authGuard());
chatbotRouter.post('/query', chatbotHandler);

import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import type { AuthenticatedRequest } from '../../types/express.js';
import { handleChatbotQuery } from './chatbot.service.js';

const chatbotSchema = z.object({
  message: z.string().min(1),
  faqContext: z.string().default('')
});

export async function chatbotHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as AuthenticatedRequest).user;
    const { message, faqContext } = chatbotSchema.parse(req.body);
    const response = await handleChatbotQuery({
      tenantId: user.tenantId,
      message,
      faqContext
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
}

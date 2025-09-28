import type { CreateChatCompletionRequest } from 'openai';

import { env } from '../config/env.js';

// Lazy import to avoid mandatory dependency when key not configured
let client: any;

async function getClient() {
  if (!client) {
    const { OpenAI } = await import('openai');
    client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }
  return client;
}

export async function createChatCompletion(request: CreateChatCompletionRequest) {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  const sdk = await getClient();
  return sdk.chat.completions.create(request);
}

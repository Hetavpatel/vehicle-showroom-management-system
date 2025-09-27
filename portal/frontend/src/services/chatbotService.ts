import httpClient from './httpClient';

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const sendChatMessage = async (messages: ChatMessage[]) => {
  const { data } = await httpClient.post<{ reply: string; followUp?: string[] }>('/chatbot/query', { messages });
  return data;
};

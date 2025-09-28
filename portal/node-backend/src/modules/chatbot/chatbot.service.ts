import { createChatCompletion } from '../../integrations/openAiClient.js';

const systemPrompt = `You are a helpful assistant for a clinic and gym booking portal.
Answer based on the provided FAQ context. If unsure, say you are not sure and suggest contacting staff.`;

export async function handleChatbotQuery({
  tenantId,
  message,
  faqContext
}: {
  tenantId: string;
  message: string;
  faqContext: string;
}) {
  const completion = await createChatCompletion({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Tenant: ${tenantId}. FAQ:\n${faqContext}\n---\nQuestion: ${message}` }
    ],
    temperature: 0.3,
    max_tokens: 200
  });

  return {
    reply: completion.choices[0]?.message?.content ?? 'I am unable to answer that right now.',
    confidence: completion.choices[0]?.finish_reason === 'stop' ? 0.7 : 0.3,
    suggestedNextAction: 'BOOKING_FLOW'
  };
}

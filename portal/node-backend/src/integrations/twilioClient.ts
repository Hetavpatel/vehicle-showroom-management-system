import { env } from '../config/env.js';

let client: any;

async function getClient() {
  if (!client) {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN) {
      throw new Error('Twilio credentials not configured');
    }
    const twilio = await import('twilio');
    client = twilio.default(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }
  return client;
}

export async function sendSms(to: string, body: string) {
  if (!env.TWILIO_MESSAGING_SERVICE_SID) {
    throw new Error('TWILIO_MESSAGING_SERVICE_SID not configured');
  }
  const twilioClient = await getClient();
  return twilioClient.messages.create({
    messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID,
    to,
    body
  });
}

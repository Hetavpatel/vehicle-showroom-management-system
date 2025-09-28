import { env } from '../config/env.js';

let client: any;

async function getClient() {
  if (!client) {
    if (!env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }
    const sendgrid = await import('@sendgrid/mail');
    sendgrid.setApiKey(env.SENDGRID_API_KEY);
    client = sendgrid;
  }
  return client;
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const sg = await getClient();
  return sg.send({
    to,
    from: 'no-reply@booking-portal.local',
    subject,
    html
  });
}

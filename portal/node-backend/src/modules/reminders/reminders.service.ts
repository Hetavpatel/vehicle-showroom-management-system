import createHttpError from 'http-errors';

import { prisma } from '../../database/prisma.js';
import { sendEmail } from '../../integrations/sendgridClient.js';
import { sendSms } from '../../integrations/twilioClient.js';

export async function listTemplates(tenantId: string) {
  return prisma.reminderTemplate.findMany({ where: { tenantId } });
}

export async function scheduleReminder({
  bookingId,
  channel,
  sendAt,
  payload
}: {
  bookingId: string;
  channel: 'SMS' | 'EMAIL';
  sendAt: Date;
  payload: Record<string, unknown>;
}) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      member: {
        include: {
          profile: true
        }
      }
    }
  });

  if (!booking) {
    throw createHttpError(404, 'Booking not found');
  }

  const reminder = await prisma.reminder.create({
    data: {
      bookingId,
      channel,
      sendAt,
      payload
    }
  });

  // For demo, immediately trigger send
  if (channel === 'EMAIL') {
    await sendEmail({
      to: booking.member.email,
      subject: 'Booking Reminder',
      html: `<p>Reminder for your booking on ${booking.startAt.toISOString()}</p>`
    });
  } else if (channel === 'SMS') {
    const phone = booking.member.profile?.phoneEncrypted;
    if (!phone) {
      throw createHttpError(400, 'Member does not have SMS number');
    }
    await sendSms(phone, `Reminder: booking on ${booking.startAt.toISOString()}`);
  }

  return reminder;
}

import createHttpError from 'http-errors';

import { prisma } from '../../database/prisma.js';
import type { AuthenticatedRequest } from '../../types/express.js';

export async function getCurrentUser(user: AuthenticatedRequest['user']) {
  return prisma.user.findUnique({
    where: { id: user.id },
    include: {
      profile: true
    }
  });
}

export async function updateProfile(
  user: AuthenticatedRequest['user'],
  payload: { firstName?: string; lastName?: string; phoneEncrypted?: string; timezone?: string }
) {
  const existing = await prisma.user.findUnique({ where: { id: user.id } });
  if (!existing) {
    throw createHttpError(404, 'User not found');
  }

  return prisma.userProfile.upsert({
    where: { userId: user.id },
    update: payload,
    create: {
      userId: user.id,
      firstName: payload.firstName ?? '',
      lastName: payload.lastName ?? '',
      phoneEncrypted: payload.phoneEncrypted ?? '',
      timezone: payload.timezone ?? 'UTC',
      consentFlags: {}
    }
  });
}

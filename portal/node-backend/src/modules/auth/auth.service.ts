import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { prisma } from '../../database/prisma.js';
import { env } from '../../config/env.js';
import type { User } from '@prisma/client';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '30d';

function signAccessToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      tenantId: user.tenantId,
      role: user.role
    },
    env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );
}

function signRefreshToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      tenantId: user.tenantId,
      role: user.role
    },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_TTL }
  );
}

export async function signup({ email, password, tenantId }: { email: string; password: string; tenantId: string }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw createHttpError(409, 'Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      tenantId,
      role: 'MEMBER'
    }
  });

  return {
    user,
    tokens: {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user)
    }
  };
}

export async function login({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return {
    user,
    tokens: {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user)
    }
  };
}

export async function refreshToken(token: string) {
  try {
    const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
      id: string;
      tenantId: string;
    };
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      throw createHttpError(401, 'Invalid refresh token');
    }

    return {
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user)
    };
  } catch (error) {
    throw createHttpError(401, 'Invalid refresh token');
  }
}

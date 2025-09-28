import type { Request } from 'express';

type UserRole = 'ADMIN' | 'STAFF' | 'MEMBER';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      tenantId: string;
      role: UserRole;
    };
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    tenantId: string;
    role: UserRole;
  };
}

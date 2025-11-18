import { NextRequest } from 'next/server';
import { Role } from '@/types/enums';
import { UUID } from 'node:crypto';

interface JWTPayload {
  exp?: number;
  iat?: number;
  role: Role;
  id: UUID;
  platformId: UUID;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function getJwt(request: NextRequest) {
  return request.cookies.get('jwt')?.value;
}

export function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return true;
    }
    const payload = JSON.parse(atob(parts[1])) as JWTPayload;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTimestamp) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export function decodeJwt(token: string): JWTPayload {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const payload = JSON.parse(atob(parts[1])) as JWTPayload;
    return payload;
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}

export function getRoleFromJwt(token: string | undefined): Role | null {
  if (!token) {
    return null;
  }
  const decoded = decodeJwt(token);
  return decoded.role;
}

import { NextRequest } from 'next/server';

interface JWTPayload {
  exp?: number;
  iat?: number;
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
      return true; // Invalid format
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

import { NextRequest, NextResponse } from 'next/server';
import { isPrivateRoute, ROUTES } from '@/lib/routes';
import { getJwt, isJwtExpired } from '@/lib/jwt';
import { API_BASE_URL } from '@/lib/apiClient';

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL(ROUTES.LOGIN.path, request.url);
  loginUrl.searchParams.set('redirect', pathname);

  const response = NextResponse.redirect(loginUrl);

  // Usuń tokeny przy przekierowaniu na login
  response.cookies.delete('jwt');
  response.cookies.delete('refreshToken');

  return response;
}

async function refreshAccessToken(refreshToken: string): Promise<{
  token: string;
  refreshToken: string;
} | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Refresh token failed:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivate = isPrivateRoute(pathname);

  // Publiczne ścieżki - przepuść
  if (!isPrivate) {
    return NextResponse.next();
  }

  const jwt = getJwt(request);
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Brak JWT - sprawdź czy możemy odświeżyć
  if (!jwt || isJwtExpired(jwt)) {
    // Brak refresh tokenu - redirect do login
    if (!refreshToken) {
      return redirectToLogin(request, pathname);
    }

    // Spróbuj odświeżyć token
    const tokens = await refreshAccessToken(refreshToken);

    if (!tokens) {
      // Refresh się nie powiódł - redirect do login
      return redirectToLogin(request, pathname);
    }

    const response = NextResponse.next();

    response.cookies.set('jwt', tokens.token, {
      maxAge: 15 * 60, // 15 minut
      path: '/',
    });

    response.cookies.set('refreshToken', tokens.refreshToken, {
      maxAge: 60 * 60 * 24, // 24 godziny
      path: '/',
    });

    return response;
  }

  // JWT jest ważny - kontynuuj normalnie
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
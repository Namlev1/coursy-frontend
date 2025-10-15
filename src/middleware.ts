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
  const jwt = getJwt(request);
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const jwtInvalid = !jwt || isJwtExpired(jwt);

  // JWT nieważny i mamy refreshToken → odśwież
  if (jwtInvalid && refreshToken) {
    const tokens = await refreshAccessToken(refreshToken);

    if (!tokens) {
      return redirectToLogin(request, pathname);
    }

    const response = NextResponse.next();
    response.cookies.set('jwt', tokens.token, {
      maxAge: 15 * 60,
      path: '/',
    });
    response.cookies.set('refreshToken', tokens.refreshToken, {
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return response;
  }

  // JWT nieważny, brak refreshToken i prywatna ścieżka → redirect
  if (jwtInvalid && isPrivateRoute(pathname)) {
    return redirectToLogin(request, pathname);
  }

  // JWT ważny lub publiczna ścieżka → kontynuuj
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
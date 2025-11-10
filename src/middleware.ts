import { NextRequest, NextResponse } from 'next/server';
import { canAccessRoute, isPrivateRoute, ROUTES } from '@/lib/routes';
import { getJwt, getRoleFromJwt, isJwtExpired } from '@/lib/jwt';
import { API_BASE_URL } from '@/lib/apiClient';

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL(ROUTES.LOGIN.path, request.url);
  loginUrl.searchParams.set('redirect', pathname);

  const response = NextResponse.redirect(loginUrl);

  response.cookies.delete('jwt');
  response.cookies.delete('refreshToken');

  return response;
}

function getRedirectHome(request: NextRequest) {
  const homeUrl = new URL(ROUTES.HOME.path, request.url);
  return NextResponse.redirect(homeUrl);
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

  // JWT nieważny i mamy refreshToken
  if (jwtInvalid && refreshToken) {
    const tokens = await refreshAccessToken(refreshToken);

    if (!tokens) {
      return redirectToLogin(request, pathname);
    }

    let response: NextResponse<unknown>;
    if (!canAccessRoute(pathname, getRoleFromJwt(tokens.token))) {
      response = getRedirectHome(request);
    } else {
      response = NextResponse.next();
    }

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

  // JWT nieważny, brak refreshToken i prywatna ścieżka - redirect
  if (jwtInvalid && isPrivateRoute(pathname)) {
    return redirectToLogin(request, pathname);
  }

  // JWT ważny, ale brak dostępu do ścieżki - redirect
  if (!canAccessRoute(pathname, getRoleFromJwt(jwt!))) {
    return getRedirectHome(request);
  }

  // Publiczna ścieżka - kontynuuj
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
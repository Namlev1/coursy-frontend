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

async function getPlatformIdByDomain(
  hostname: string
): Promise<string | undefined> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/platforms/domain/${hostname}`
    );

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch platformId:', error);
    return undefined;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];
  let platformId = request.cookies.get('platformId')?.value;
  let response = NextResponse.next();
  response.headers.set('X-Debug-Subdomain', subdomain);

  if (!platformId) {
    platformId = await getPlatformIdByDomain(subdomain);

    if (!platformId) {
      const redirectResponse = NextResponse.redirect(
        new URL('/platform-not-found', request.url)
      );
      redirectResponse.headers.set('X-Debug-Subdomain', subdomain);
      return redirectResponse;
    }
    response.cookies.set('platformId', platformId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 rok
      path: '/',
    });
  }

  const jwt = getJwt(request);
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const jwtInvalid = !jwt || isJwtExpired(jwt);

  // JWT nieważny i mamy refreshToken
  if (jwtInvalid && refreshToken) {
    const tokens = await refreshAccessToken(refreshToken);
    if (!tokens) {
      const redirectResponse = redirectToLogin(request, pathname);
      // Zachowaj platformId w cookie podczas redirectu
      redirectResponse.cookies.set('platformId', platformId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
      redirectResponse.headers.set('X-Debug-Subdomain', subdomain);

      return redirectResponse;
    }

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

    response.cookies.set('platformId', platformId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });

    return response;
  }

  // JWT nieważny, brak refreshToken i prywatna ścieżka - redirect
  if (jwtInvalid && isPrivateRoute(pathname)) {
    const redirectResponse = redirectToLogin(request, pathname);
    redirectResponse.cookies.set('platformId', platformId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    return redirectResponse;
  }

  // JWT ważny, ale brak dostępu do ścieżki - redirect
  if (jwt && !canAccessRoute(pathname, getRoleFromJwt(jwt))) {
    const redirectResponse = getRedirectHome(request);
    redirectResponse.cookies.set('platformId', platformId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    redirectResponse.headers.set('X-Platform-Id', platformId);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|platform-not-found).*)',
  ],
  headers: {
    'X-Debug-Subdomain': true,
  },
};

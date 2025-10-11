import { NextRequest, NextResponse } from 'next/server';
import { isPrivateRoute, ROUTES } from '@/lib/routes';
import { getJwt, isJwtExpired } from '@/lib/jwt';

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL(ROUTES.LOGIN.path, request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl, {
    headers: request.headers,
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = isPrivateRoute(pathname);
  const jwt = getJwt(request);

  if (isPrivate && (!jwt || isJwtExpired(jwt))) {
    return redirectToLogin(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

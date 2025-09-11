import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/dashboard', '/profile', '/admin'];

function getPlatformIdHeader() {
  const platformId = '4e1c791d-c481-4f9a-9eff-b701c2875c5f'; // Coursy
  // const platformId = '6ba24dac-f6ca-471c-8f00-9ea89128170f'; // EduCorp

  return {
    'x-platform-id': platformId,
  };
}

export function middleware(request: NextRequest) {
  // Mock tenant detection
  const platformHeader = getPlatformIdHeader();
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const jwt = request.cookies.get('jwt')?.value;

  if (isPrivateRoute && !jwt) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl, {
      headers: platformHeader,
    });
  }

  return NextResponse.next({
    headers: platformHeader,
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

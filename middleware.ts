import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost:3000'

  // Mock tenant detection - in real app this would query database
  let tenantId = '4e1c791d-c481-4f9a-9eff-b701c2875c5f';

  // Add tenant info to headers for pages to use
  const response = NextResponse.next()
  response.headers.set('x-tenant-id', tenantId)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
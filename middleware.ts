import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost:3000'

  // Mock tenant detection - in real app this would query database
  let tenantId = 'coursy' // Default to mother app

  // Simple domain mapping for demo
  if (hostname.includes('localhost') || hostname.includes('coursy.com')) {
    tenantId = 'coursy'
  }
  // You can add more tenant mappings here later
  // else if (hostname === 'companyabc.com') {
  //   tenantId = 'company-abc'
  // }

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
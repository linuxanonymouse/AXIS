import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Let them see the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('axis_admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const verified = await verifyToken(token);
    if (!verified) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('axis_admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
